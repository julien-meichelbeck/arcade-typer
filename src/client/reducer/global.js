import { SET_MESSAGE } from 'shared/actions/global'

const initialState = {
  message: null,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_MESSAGE:
      return {
        ...initialState,
        message: payload,
      }
    default:
      return state
  }
}
