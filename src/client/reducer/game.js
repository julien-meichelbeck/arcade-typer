import { SET_GAME_STATE, LEAVE_GAME, RESET_GAME } from 'shared/actions/games'

const initialState = {
  players: [],
}

export default (state = initialState, action) => {
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
        startedAgo: null,
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
