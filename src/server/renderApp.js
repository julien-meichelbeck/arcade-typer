import { APP_CONTAINER_CLASS, STATIC_PATH, WDS_PORT } from 'shared/config'
import { isProd } from 'shared/utils'

const renderApp = (req, additionalState = {}) => {
  const initialState = JSON.stringify({
    account: req.user ? { id: req.user.id, username: req.user.username } : null,
    ...additionalState,
  })

  return `<!doctype html>
      <html>
        <head>
          <title>Arcade typer</title>
          <link href="https://fonts.googleapis.com/css?family=Montserrat|Open+Sans|Press+Start+2P" rel="stylesheet">
          <link rel="stylesheet" href="${STATIC_PATH}/css/style.css">
        </head>
        <body style="background-color: white;">
          <div class="${APP_CONTAINER_CLASS}"></div>
          <script>
            window.__PRELOADED_STATE__ = ${initialState}
          </script>
          <script src="${isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}/dist`}/js/bundle.js"></script>
        </body>
      </html>`
}

export default renderApp
