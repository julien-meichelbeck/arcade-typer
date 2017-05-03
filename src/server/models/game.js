import * as redis from 'server/redis'

const toRedisKey = id => `games::${id}`
const TEXTS = [
  'I want you to remember, Clark... In all the years to come... in your most private moments... I want you to remember my hand at your throat... I want you to remember the one man who beat you...',
  'The accumulated filth of all their sex and murder will foam up about their waists and all the whores and politicians will look up and shout "Save us!"... and I\'ll look down and whisper "No."',
  'Heard joke once: Man goes to doctor. Says he\'s depressed. Says life seems harsh and cruel. Says he feels all alone in a threatening world where what lies ahead is vague and uncertain. Doctor says, "Treatment is simple. Great clown Pagliacci is in town tonight. Go and see him. That should pick you up." Man bursts into tears. Says, "But doctor...I am Pagliacci.',
]

export default class Game {
  static find(id, callback) {
    redis.connect().get(toRedisKey(id), (err, game) => {
      if (!err) {
        callback(new Game(JSON.parse(game)))
      } else {
        console.error(err)
      }
    })
  }

  static create() {
    const game = new Game({
      id: Math.floor(Math.random() * (Math.floor(10000 - 1000) + 1000)),
      text: TEXTS[Math.floor(Math.random() * TEXTS.length)],
      players: [],
    })
    game.save()
    return game
  }

  constructor({ id, text, players }) {
    this.id = id
    this.text = text
    this.players = players
  }

  addPlayer(player) {
    this.players = this.players.concat(player)
    this.save()
  }

  updatePlayer(player) {
    this.players = this.players.map(p => (p.id === player.id ? player : p))
    this.save()
  }

  removePlayer(player) {
    this.players = this.players.filter(p => p.id !== player.id)
    this.save()
  }

  save() {
    redis.connect().set(toRedisKey(this.id), this.toJson())
  }

  toJson() {
    return JSON.stringify(this.toObject())
  }

  toObject() {
    return {
      id: this.id,
      text: this.text,
      players: this.players,
    }
  }
}
