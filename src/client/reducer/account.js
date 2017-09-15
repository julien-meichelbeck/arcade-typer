import { SAVE_ACCOUNT } from 'shared/action/accounts'

const initialState = null

const playersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ACCOUNT:
      const { password, ...account } = action.payload
      window.__PRELOADED_STATE__.account = account
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export default playersReducer
