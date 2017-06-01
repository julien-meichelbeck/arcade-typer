import { createAction } from 'redux-actions'

export const JOIN_GAME = 'TO_SERVER/JOIN_GAME'
export const joinGame = createAction(JOIN_GAME)

export const LEAVE_GAME = 'TO_SERVER/LEAVE_GAME'
export const leaveGame = createAction(LEAVE_GAME)

export const SEND_PLAYER = 'TO_SERVER/SEND_PLAYER'
export const sendPlayer = createAction(SEND_PLAYER)

export const GET_GAME_STATE = 'TO_CLIENT/GET_GAME_STATE'
export const getGameState = createAction(GET_GAME_STATE)

export const SET_GAME_STATE = 'TO_CLIENT/SET_GAME_STATE'
export const setGameState = createAction(SET_GAME_STATE)

export const RESET_GAME = 'TO_CLIENT/RESET_GAME'
