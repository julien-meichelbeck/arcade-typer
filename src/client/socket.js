/* eslint-disable no-console */
import socketIOClient from 'socket.io-client'
import Rx from 'rxjs'
import { GET_GAME_STATE } from 'shared/actions/games'
import isEqual from 'lodash/isEqual'

export const socket = socketIOClient(window.location.host)

export const gameState$ = Rx.Observable
  .create(observer => {
    socket.on(GET_GAME_STATE, newGameState => {
      if (!isEqual(window.gameState, newGameState)) {
        observer.next(newGameState)
        console.log(newGameState)
      }
    })
  })
  .publishReplay(1)
  .refCount()
