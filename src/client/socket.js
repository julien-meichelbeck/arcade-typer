import socketIOClient from 'socket.io-client'
import { setGameState, SET_GAME_STATE, RESET_GAME } from 'shared/actions/games'
import { SET_MESSAGE, setMessage } from 'shared/actions/global'

export const socket = socketIOClient(window.location.host)

const setUpSocket = (store) => {
  socket.on(SET_GAME_STATE, (newGameState) => {
    store.dispatch(setGameState(newGameState))
  })

  socket.on(RESET_GAME, () => {
    store.dispatch(setMessage({ message: { text: null } }))
    window.location.reload()
  })

  socket.on(SET_MESSAGE, ({ message }) => {
    store.dispatch(setMessage(message))
  })
}

export default setUpSocket
