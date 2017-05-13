// @flow

import {
  SET_GAME_STATE,
  LEAVE_GAME,
  RESET_GAME,
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
    case RESET_GAME:
      return {
        ...state,
        text: action.payload.nextText,
        players: state.players.map(player => ({
          ...player,
          speed: 0,
          progress: 0,
          time: 0,
          status: 'waiting',
        })),
      }
    case LEAVE_GAME:
      return initialState
    default:
      return state
  }
}
