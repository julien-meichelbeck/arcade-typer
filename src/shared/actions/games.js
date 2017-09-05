import { createAction } from 'redux-actions'

export const JOIN_GAME = 'SEND/JOIN_GAME'
export const joinGame = createAction(JOIN_GAME)

export const LEAVE_GAME = 'SEND/LEAVE_GAME'
export const leaveGame = createAction(LEAVE_GAME)

export const SEND_PLAYER_STATE = 'SEND/SEND_PLAYER_STATE'
export const sendPlayer = createAction(SEND_PLAYER_STATE)

export const GET_GAME_STATE = 'RECEIVE/GET_GAME_STATE'
