import { WAITING_ROOM, READY_CHECK, COUNTDOWN, PLAYING, NEXT_GAME_COUNTDOWN } from 'shared/statuses'
import handleGameChange from './handleGameChange'

let game
let bruce
let clark

beforeEach(() => {
  Date.now = jest.genMockFunction().mockReturnValue(12345)
  bruce = [{ id: 1, username: 'Bruce Wayne', progress: 2 }]
  clark = [{ id: 2, username: 'Clark Kent', progress: null }]
  game = {
    id: 1,
    text: { content: 'This is a placeholder text' },
    players: bruce,
  }
})

describe('computeStatus', () => {
  it('is WAITING ROOM if there is one player', () => {
    expect(handleGameChange(game).status).toBe(WAITING_ROOM)
  })

  it('is READY_CHECK if there are two players', () => {
    game.players = [...game.players, clark]
    expect(handleGameChange(game).status).toBe(READY_CHECK)
  })

  it('is COUNTDOWN if there are two players ready', () => {
    game.players = [{ ...bruce, status: 'ready' }, { ...clark, status: 'ready' }]
    expect(handleGameChange(game).status).toBe(COUNTDOWN)
  })

  it('is not COUNTDOWN if there are only one player ready', () => {
    game.players = [bruce, { ...clark, status: 'ready' }]
    expect(handleGameChange(game).status).toBe(READY_CHECK)
  })

  it('statys countdown if countdown is running', () => {
    game.players = [{ ...bruce, status: 'ready' }, { ...clark, status: 'ready' }]
    game.countdown = 1
    expect(handleGameChange(game).status).toBe(COUNTDOWN)
  })

  it('is PLAYING if countdown is done', () => {
    game.countdown = 0
    expect(handleGameChange(game).status).toBe(PLAYING)
  })

  it('stays PLAYING', () => {
    game.status = PLAYING
    expect(handleGameChange(game).status).toBe(PLAYING)
  })

  it('is NEXT_GAME_COUNTDOWN if at least one player is done', () => {
    game.players[0].status = 'done'
    expect(handleGameChange(game).status).toBe(NEXT_GAME_COUNTDOWN)
  })
})

describe('computePlayers', () => {
  it('sets status to done', () => {
    game.players[0].progress = 20
    expect(handleGameChange(game).players).toEqual([
      { doneAt: 12345, id: 1, progress: 20, status: 'done', username: 'Bruce Wayne' },
    ])
  })
})
