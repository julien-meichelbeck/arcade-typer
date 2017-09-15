import * as redis from 'server/redis'
import nameGenerator from 'server/services/nameGenerator'
import { WAITING_ROOM, COUNTDOWN, NEXT_GAME_COUNTDOWN } from 'shared/statuses'
import { isProd, sample, now } from 'shared/utils'
import { GET_GAME_STATE } from 'shared/actions/games'
import { startCountdown, startNextGameCountdown } from './asyncActions'
import handleGameChange from './handleGameChange'

const TTL = 7200 // 2 Hours
const COLORS = [
  'rgb(170, 111, 252)',
  'rgb(135, 255, 59)',
  'rgb(250, 113, 97)',
  'rgb(237, 241, 120)',
  'rgb(43, 255, 234)',
  'rgb(210, 0, 142)',
]

const TEXTS = isProd
  ? [
      {
        content:
          'I want you to remember, Clark... In all the years to come... in your most private moments... I want you to remember my hand at your throat... I want you to remember the one man who beat you...',
        source: 'The Dark Knight Rises - Frank Miller',
      },
      {
        content:
          'The accumulated filth of all their sex and murder will foam up about their waists and all the whores and politicians will look up and shout "Save us!"... and I\'ll look down and whisper "No."',
        source: 'Watchmen - Alan Moore',
      },
      {
        content:
          'Heard joke once: Man goes to doctor. Says he\'s depressed. Says life seems harsh and cruel. Says he feels all alone in a threatening world where what lies ahead is vague and uncertain. Doctor says, "Treatment is simple. Great clown Pagliacci is in town tonight. Go and see him. That should pick you up." Man bursts into tears. Says, "But doctor... I am Pagliacci.',
        source: 'Watchmen - Alan Moore',
      },
    ]
  : [{ content: 'Foo is bar', author: 'Lorem Ipsum' }]

const toRedisKey = gameId => `games:${gameId}`

const handlePlayerState = (player, state) => {
  const isDone = player.progress >= state.text.content.split(' ').length
  return isDone ? { ...player, status: 'done', doneAt: now() } : player
}

export default class Game {
  static async find(gameId, io) {
    return new Promise((resolve, reject) => {
      redis.connect().get(toRedisKey(gameId), (error, game) => {
        if (game && !error) resolve(new Game(JSON.parse(game), io))
        else if (!game) reject(`Could not find game ${toRedisKey(gameId)}`)
        else reject(error)
      })
    })
  }

  static create() {
    const game = new Game({
      gameId: nameGenerator(),
      text: sample(TEXTS),
      players: [],
      createdAt: now(),
      status: WAITING_ROOM,
      countdown: null,
      nextGameCountdown: null,
    })
    game.save()
    return game
  }

  constructor(attributes, io) {
    const { gameId, ...state } = attributes
    this.gameId = gameId
    this.state = state
    this.io = io
    if (io) {
      this.onChange = () => io.to(this.gameId).emit(GET_GAME_STATE, this.toClientData())
    }
  }

  setState(newState) {
    const previousStatus = this.state.status
    this.state = handleGameChange({ ...this.state, ...newState })
    if (this.onChange) this.onChange(this.state)
    this.save()
    if (previousStatus !== this.state.status) {
      switch (this.state.status) {
        case COUNTDOWN:
          startCountdown(this.gameId, this.io)
          break
        case NEXT_GAME_COUNTDOWN:
          startNextGameCountdown(this.gameId, this.io)
          break
        default:
          break
      }
    }
  }

  addPlayer(player) {
    const { players } = this.state
    if (players.find(({ id }) => id === player.id)) {
      this.onChange(this.state)
      return
    }

    const colors = COLORS.filter(color => !players.map(({ color }) => color).includes(color))
    const newPlayer = { ...player, progress: 0, color: sample(colors) || sample(COLORS) }
    this.setState({ players: [...players, newPlayer] })
  }

  updatePlayer(playerState) {
    const { players } = this.state
    this.setState({
      players: players.map(
        player =>
          player.id === playerState.id
            ? handlePlayerState({ ...player, ...playerState }, this.state, this.gameId, this.io)
            : player,
      ),
    })
  }

  removePlayer(player) {
    const { players } = this.state
    this.setState({ players: players.filter(p => p.id !== player.id) })
    if (players.length === 0) this.destroy()
  }

  reset() {
    const players = this.state.players.map(player => ({
      ...player,
      speed: 0,
      status: null,
      progress: null,
      doneAt: null,
    }))
    this.setState({
      text: sample(TEXTS),
      status: WAITING_ROOM,
      countdown: null,
      nextGameCountdown: null,
      players,
    })
  }

  save() {
    redis.connect().set(toRedisKey(this.gameId), this.toJson(), 'EX', TTL)
  }

  destroy() {
    redis.connect().del(toRedisKey(this.gameId))
  }

  toJson() {
    return JSON.stringify(this.toClientData())
  }

  toClientData() {
    return {
      gameId: this.gameId,
      ...this.state,
    }
  }
}
