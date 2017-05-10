// eslint-disable-next-line import/prefer-default-export
export const isProd = process.env.NODE_ENV === 'production'

export const absoluteUrl = path => [window.location.origin, path].join('')

const AVERAGE_CHARS_PER_WORD = 5
export const wordsPerMinute = (duration, array, index) => {
  const durationInMinutes = duration / 60000
  const typedCharactersCount =
    array
      .slice(0, index)
      .reduce((acc, elem) => acc + elem.length, 0)
  return Math.round(((typedCharactersCount / AVERAGE_CHARS_PER_WORD) / durationInMinutes) * 1.20)
}

export const rankedPlayers = players => players
  .filter(player => player.status === 'done')
  .sort((pA, pB) => pA.time - pB.time)
