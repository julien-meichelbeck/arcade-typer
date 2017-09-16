// WEB
export const HOME_ROUTE = '/'
export const PLAY_ROUTE = '/play'
export const NOT_FOUND = '/404'
export const GAME_START_ROUTE = '/game/start'
export const gameRoute = gameId => `/games/${gameId || ':gameId'}`

// API
export const LOGIN_ROUTE = '/login'
export const LOGOUT_ROUTE = '/logout'
