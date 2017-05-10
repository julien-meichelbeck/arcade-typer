// @flow

import {
  SET_GAME_STATE,
  LEAVE_GAME,
  SET_GAME_MESSAGE,
} from 'shared/action/games'

const initialState = {
  players: [],
}

export default (state: Object = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case SET_GAME_STATE:
      return {
        ...state,
        ...action.payload,
      }
    case SET_GAME_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
      }
    case LEAVE_GAME:
      return initialState
    default:
      return state
  }
}
