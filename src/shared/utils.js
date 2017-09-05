// eslint-disable-next-line import/prefer-default-export
export const isProd = process.env.NODE_ENV === 'production'
export const absoluteUrl = path => [window.location.origin, path].join('')
export const rankedPlayers = players =>
  players.filter(player => player.status === 'done').sort((pA, pB) => pA.time - pB.time)
export const sample = array => array[Math.floor(Math.random() * array.length)]
