import { createAction } from 'redux-actions'

export const JOIN_GAME = 'TO_SERVER/JOIN_GAME'
export const joinGame = createAction(JOIN_GAME)

export const LEAVE_GAME = 'TO_SERVER/LEAVE_GAME'
export const leaveGame = createAction(LEAVE_GAME)

export const SEND_PLAYER_STATE = 'TO_SERVER/SEND_PLAYER_STATE'
export const sendPlayer = createAction(SEND_PLAYER_STATE)

export const GET_GAME_STATE = 'TO_CLIENT/GET_GAME_STATE'
