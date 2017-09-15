import { WAITING_ROOM, READY_CHECK, COUNTDOWN, PLAYING, NEXT_GAME_COUNTDOWN } from 'shared/statuses'
import { now } from 'shared/utils'

const computeStatus = ({ players, status, countdown }) => {
  if (players.filter(({ status }) => status === 'done').length === 1) return NEXT_GAME_COUNTDOWN
  if (status === PLAYING || countdown === 0) return PLAYING
  if (players.filter(({ status }) => status === 'ready').length > 1) return COUNTDOWN
  if (players.length > 1) return READY_CHECK
  return WAITING_ROOM
}

const computePlayersStatuses = ({ text, players }) => {
  const textSize = text.content.split(' ').length
  return players.map(player => (player.progress >= textSize ? { ...player, status: 'done', doneAt: now() } : player))
}

export default state => ({
  ...state,
  players: computePlayersStatuses(state),
  status: computeStatus(state),
  countdown: state.countdown === 0 ? null : state.countdown,
})
