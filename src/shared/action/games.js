// @flow

import 'isomorphic-fetch'

import { createAction } from 'redux-actions'

export const JOIN_GAME = 'SERVER/JOIN_GAME'
export const joinGame = createAction(JOIN_GAME)

export const LEAVE_GAME = 'SERVER/LEAVE_GAME'
export const leaveGame = createAction(LEAVE_GAME)

export const CHANGE_GAME = 'CLIENT/CHANGE_GAME'

export const UPDATE_PLAYER_PROGRESS = 'CLIENT/UPDATE_PLAYER_PROGRESS'
export const updatePlayerProgress = createAction(UPDATE_PLAYER_PROGRESS)

export const SEND_PLAYER = 'SERVER/SEND_PLAYER'
export const sendPlayer = createAction(SEND_PLAYER)

export const SET_GAME_STATE = 'CLIENT/SET_GAME_STATE'
export const setGameState = createAction(SET_GAME_STATE)

export const RESET_GAME = 'RESET_GAME'
export const resetGame = createAction(RESET_GAME)

export const CREATE_GAME = 'SERVER/CREATE_GAME'
export const createGame = () => (dispatch) => {
  fetch('/play', { method: 'POST', credentials: 'include' })
    .then(response => response.json())
    .then(gameData => dispatch(setGameState(gameData)))
    .catch(error => console.log(error))
}
