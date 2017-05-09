// @flow

import 'isomorphic-fetch'

import { createAction } from 'redux-actions'

export const JOIN_GAME = 'SERVER/JOIN_GAME'
export const joinGame = createAction(JOIN_GAME)

export const LEAVE_GAME = 'SERVER/LEAVE_GAME'
export const leaveGame = createAction(LEAVE_GAME)

export const SET_GAME_MESSAGE = 'SET_GAME_MESSAGE'
export const setGameMessage = createAction(SET_GAME_MESSAGE)

export const CHANGE_GAME = 'CLIENT/CHANGE_GAME'

export const SEND_PLAYER_PROGRESS = 'SERVER/SEND_PLAYER_PROGRESS'
export const sendPlayerProgress = createAction(SEND_PLAYER_PROGRESS)

export const UPDATE_PLAYER_PROGRESS = 'CLIENT/UPDATE_PLAYER_PROGRESS'
export const updatePlayerProgress = createAction(UPDATE_PLAYER_PROGRESS)

export const SET_GAME_STATE = 'CLIENT/SET_GAME_STATE'
export const setGameState = createAction(SET_GAME_STATE)

export const CREATE_GAME = 'SERVER/CREATE_GAME'
export const createGame = () => (dispatch) => {
  fetch('/play', { method: 'POST', credentials: 'include' })
    .then(response => response.json())
    .then(gameData => dispatch(setGameState(gameData)))
    .catch(error => console.log(error))
}
