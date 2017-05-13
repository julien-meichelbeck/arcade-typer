import { sendPlayer } from 'shared/action/games'
import { wordsPerMinute } from 'shared/utils'

export default ({
  setWordInput,
  words,
  index,
  setIndex,
  startTime,
  setStartTime,
  setStatus,
  game,
  dispatch,
  account,
}) => ({ target: { value } }) => {
  const now = Date.now()
  if (!startTime) {
    setStartTime(now)
    setStatus('playing')
  }
  const isWordWithSpace = `${words[index]} ` === value
  const isLastWord = index + 1 === words.length && words[index] === value
  if (isWordWithSpace || isLastWord) {
    const time = now - startTime
    const playerProgress = {
      player: {
        id: account.id,
        progress: index + 1,
        speed: wordsPerMinute(time, words, index),
        time,
      },
      gameId: game.id,
    }
    if (isWordWithSpace) {
      setWordInput('')
      setIndex(index + 1)
      playerProgress.player.status = 'typing'
    } else if (isLastWord) {
      setWordInput('')
      setStatus('done')
      playerProgress.player.status = 'done'
    }
    dispatch(sendPlayer(playerProgress))
  } else {
    setWordInput(value)
  }
}
