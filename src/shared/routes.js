// @flow

// WEB
export const HOME_ROUTE = '/'
export const PLAY_ROUTE = '/play'
export const NOT_FOUND_DEMO_PAGE_ROUTE = '/404'
export const gameRoute = (id: ?number) => `/games/${id || ':id'}`

// API
export const LOGIN_ROUTE = '/login'
export const helloEndpointRoute = (num: ?number) => `/ajax/hello/${num || ':num'}`
