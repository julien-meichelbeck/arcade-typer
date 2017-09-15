import * as redis from 'server/redis'
import Game from './game'

let game

const removeColors = players =>
  players.map(player => {
    const { color, ...playerNoColor } = player
    return playerNoColor
  })

beforeEach(() => {
  Date.now = jest.genMockFunction().mockReturnValue(12345)
  game = new Game({
    id: 1,
    text: { content: 'This is a placeholder text' },
    players: [{ id: 1, username: 'Bruce Wayne', progress: 2 }],
  })
})

afterEach(() => {
  redis.connect().flushdb()
})

test('addPlayer', () => {
  game.addPlayer({ id: 2, username: 'Clark Kent' })
  expect(removeColors(game.state.players)).toEqual([
    { id: 1, username: 'Bruce Wayne', progress: 2 },
    { id: 2, username: 'Clark Kent', progress: 0 },
  ])
})

test('removePlayer', () => {
  const spy = jest.spyOn(game, 'destroy')
  game.removePlayer({ id: 1, username: 'Bruce Wayne' })
  expect(game.state.players).toEqual([])
  // expect(spy).toHaveBeenCalled() ?
})

test('updatePlayer', () => {
  game.addPlayer({ id: 2, username: 'Clark Kent' })
  game.updatePlayer({ id: 1, username: 'Foo' })
  expect(removeColors(game.state.players)).toEqual([
    { id: 1, username: 'Foo', progress: 2 },
    { id: 2, username: 'Clark Kent', progress: 0 },
  ])
})

test('sets doneAt', () => {
  game.updatePlayer({ id: 1, progress: 20 })
  const players = removeColors(game.state.players)
  expect(players.length).toEqual(1)
  expect(players[0].progress).toEqual(20)
  expect(players[0].doneAt).toBe(12345)
  expect(players[0].status).toBe('done')
})

test('toJson', () => {
  expect(game.toJson()).toEqual(
    '{"id":1,"text":{"content":"This is a placeholder text"},"players":[{"id":1,"username":"Bruce Wayne","progress":2}]}',
  )
})

test('create', () => {
  const newGame = Game.create()
  Game.find(newGame.id).then(game => {
    expect(game.toObject()).toEqual(newGame.toObject())
  })
})

test('reset', () => {
  game.reset()
  expect(game.toClientData()).toEqual({
    countdown: null,
    gameId: undefined,
    id: 1,
    nextGameCountdown: null,
    players: [{ doneAt: null, id: 1, progress: null, speed: 0, status: null, username: 'Bruce Wayne' }],
    status: 'WAITING_ROOM',
    text: { author: 'Lorem Ipsum', content: 'Foo is bar' },
  })
})
