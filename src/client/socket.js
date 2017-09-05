/* eslint-disable no-console */
import socketIOClient from 'socket.io-client'
import Rx from 'rxjs'
import { SET_GAME_STATE } from 'shared/actions/games'
import isEqual from 'lodash/isEqual'

export const socket = socketIOClient(window.location.host)

export const gameState$ = Rx.Observable
  .create(observer => {
    socket.on(SET_GAME_STATE, newGameState => {
      observer.next(newGameState)
    })
  })
  .distinctUntilChanged(isEqual)
  .publishReplay(1)
  .refCount()
