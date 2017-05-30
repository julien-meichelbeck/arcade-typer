import React from 'react'
import { connect } from 'react-redux'
import recompact from 'shared/modules/recompact'
import Button from 'client/component/Button'
import Container from 'client/component/Container'
import injectSheet from 'react-jss'
import { HOME_ROUTE, LOGOUT_ROUTE } from 'shared/routes'
import { createGame } from 'client/actions/games'
import { withRouter } from 'react-router'

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
  withRouter,
  injectSheet(styles),
  connect(({ account }) => ({ account }), dispatch => ({ dispatch })),
)(({ classes, account, dispatch, history }) => (
  <nav className={classes.root}>
    <Container style={{ display: 'flex' }}>
      <h1 className={classes.siteTitle}>Arcade typer</h1>
      <div style={{ flex: '1 0 0' }} />
      <Button to={HOME_ROUTE} spaced primary>Home</Button>
      <Button onClick={() => dispatch(createGame(history))} spaced>New game</Button>
      {account ? <Button to={LOGOUT_ROUTE} spaced>Logout</Button> : null}
    </Container>
  </nav>
))
