import React from 'react'
import recompact from 'shared/modules/recompact'
import Button from 'client/component/Button'
import Container from 'client/component/Container'
import injectSheet from 'react-jss'
import { HOME_ROUTE, HISTORY_ROUTE, LOGOUT_ROUTE } from 'shared/routes'

const styles = {
  root: {},
  siteTitle: {
    marginTop: 23,
    color: 'rgb(38, 31, 66)',
    fontSize: 18,
    textTransform: 'uppercase',
  },
}

export default recompact.compose(
  injectSheet(styles),
  recompact.pluckObs(['currentAccount$'])
)(({ classes, currentAccount }) => (
  <nav className={classes.root}>
    <Container style={{ display: 'flex' }}>
      <h1 className={classes.siteTitle}>Arcade typer</h1>
      <div style={{ flex: '1 0 0' }} />
      <Button to={HOME_ROUTE} spaced primary>
        Home
      </Button>
      {currentAccount ? (
        <div>
          <Button spaced to={HISTORY_ROUTE}>
            My stats
          </Button>
          <Button
            onClick={() => {
              window.location = LOGOUT_ROUTE
            }}
            spaced
          >
            Logout
          </Button>
        </div>
      ) : null}
    </Container>
  </nav>
))
