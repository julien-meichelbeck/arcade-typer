// WEB
export const HOME_ROUTE = '/'
export const HISTORY_ROUTE = '/history'
export const PLAY_ROUTE = '/play'
export const NOT_FOUND = '/404'
export const NEW_GAME_ROUTE = '/games/new'
export const SOLO_GAME_ROUTE = '/games/solo'
export const gameRoute = gameId => `/games/${gameId || ':gameId'}`

// API
export const LOGIN_ROUTE = '/login'
export const LOGOUT_ROUTE = '/logout'
export const userRoute = userId => `/api/users/${userId || ':userId'}`
