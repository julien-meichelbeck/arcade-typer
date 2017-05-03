import * as redis from 'server/redis'
import Game from './game'

let game

beforeEach(() => {
  game = new Game({
    id: 1,
    text: 'This is a placeholder text',
    players: [{ id: 1, username: 'Bruce Wayne' }],
  })
})

afterEach(() => {
  redis.connect().flushdb()
})

test('addPlayer', () => {
  game.addPlayer({
    id: 2,
    username: 'Clark Kent',
  })
  expect(game.players).toEqual([
    { id: 1, username: 'Bruce Wayne' },
    { id: 2, username: 'Clark Kent' },
  ])
})

test('removePlayer', () => {
  game.removePlayer({ id: 1, username: 'Bruce Wayne' })
  expect(game.players).toEqual([])
})

test('updatePlayer', () => {
  game.addPlayer({
    id: 2,
    username: 'Clark Kent',
  })
  game.updatePlayer({ id: 1, username: 'Foo' })
  expect(game.players).toEqual([
    { id: 1, username: 'Foo' },
    { id: 2, username: 'Clark Kent' },
  ])
})

test('toJson', () => {
  expect(game.toJson()).toEqual('{"id":1,"text":"This is a placeholder text","players":[{"id":1,"username":"Bruce Wayne"}]}')
})

test('create', () => {
  const newGame = Game.create()
  Game.find(newGame.id, (game) => {
    expect(game.toObject()).toEqual(newGame.toObject())
  })
})
