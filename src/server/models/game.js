import * as redis from 'server/redis'
import nameGenerator from 'server/services/nameGenerator'
import { isProd, sample } from 'shared/utils'

const toRedisKey = id => `games::${id}`
const TTL = 7200 // 2 Hours
const COUNTDOWN = isProd ? 10 : 2
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
      content: 'I want you to remember, Clark... In all the years to come... in your most private moments... I want you to remember my hand at your throat... I want you to remember the one man who beat you...',
      source: 'The Dark Knight Rises - Frank Miller',
    },
    {
      content: 'The accumulated filth of all their sex and murder will foam up about their waists and all the whores and politicians will look up and shout "Save us!"... and I\'ll look down and whisper "No."',
      source: 'Watchmen - Alan Moore',
    },
    {
      content: 'Heard joke once: Man goes to doctor. Says he\'s depressed. Says life seems harsh and cruel. Says he feels all alone in a threatening world where what lies ahead is vague and uncertain. Doctor says, "Treatment is simple. Great clown Pagliacci is in town tonight. Go and see him. That should pick you up." Man bursts into tears. Says, "But doctor... I am Pagliacci.',
      source: 'Watchmen - Alan Moore',
    },
  ]
  : [{ content: 'Foo is bar', author: 'Lorem Ipsum' }]

export default class Game {
  static async find(id) {
    return new Promise((resolve, reject) => {
      redis.connect().get(toRedisKey(id), (error, game) => {
        if (error) {
          reject(error)
        } else {
          resolve(new Game(JSON.parse(game)))
        }
      })
    })
  }

  static create() {
    const game = new Game({
      id: nameGenerator(),
      text: sample(TEXTS),
      players: [],
      createdAt: Math.floor(Date.now()),
      countdown: null,
    })
    game.save()
    return game
  }

  constructor(attributes) {
    Object.entries(attributes).forEach(([name, value]) => {
      this[name] = value
    })
  }

  async reload() {
    return Game.find(this.id)
  }

  addPlayer(player) {
    if (this.players.find(({ id }) => id === player.id)) {
      return
    }
    const unusedColors = COLORS.filter(
      color => !this.players.map(({ color }) => color).includes(color),
    )
    this.players = this.players.concat({
      ...player,
      progress: 0,
      status: 'waiting',
      color: sample(unusedColors) || sample(COLORS),
    })
    this.save()
  }

  updatePlayer(player) {
    this.players = this.players.map(
      currentPlayer =>
        currentPlayer.id === player.id ? { ...currentPlayer, ...player } : currentPlayer,
    )
    this.save()
  }

  removePlayer(player) {
    this.players = this.players.filter(p => p.id !== player.id)
    this.save()
  }

  isDone() {
    return this.players.every(({ status }) => status === 'done')
  }

  save() {
    redis.connect().set(toRedisKey(this.id), this.toJson(), 'EX', TTL)
  }

  countdownTick() {
    this.countdown = this.countdown === null ? COUNTDOWN : this.countdown - 1
  }

  nextGame() {
    return new Game({
      id: this.id,
      createdAt: this.createdAt,
      text: sample(TEXTS),
      countdown: null,
      players: this.players.map(player => ({
        ...player,
        progress: 0,
        speed: 0,
        time: 0,
        status: 'waiting',
      })),
    })
  }

  toClientData() {
    return {
      id: this.id,
      text: this.text,
      players: this.players,
      countdown: this.countdown,
    }
  }

  toJson() {
    return JSON.stringify({
      id: this.id,
      text: this.text,
      players: this.players,
      createdAt: this.createdAt,
      countdown: this.countdown,
    })
  }
}
