import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import recompact from 'shared/modules/recompact'

import {
  HOME_ROUTE,
  PLAY_ROUTE,
  LOGOUT_ROUTE,
} from 'shared/routes'
import injectSheet from 'react-jss'

const styles = {
  root: {
    display: 'flex',
    padding: 14,
  },
  list: {
    margin: 0,
  },
  listItem: {
    listStyle: 'none',
    display: 'inline-block',
    margin: '0 14px',
    textTransform: 'uppercase',
  },
  siteTitle: {
    fontSize: '18px',
    textTransform: 'lowercase',
  },
}

export default recompact.compose(
  injectSheet(styles),
  connect(({ account }) => ({ account })),
)(({
  classes,
  account,
}) =>
  <nav className={classes.root}>
    <div className={classes.siteTitle}>Arcade typer</div>
    <div style={{ flex: '1 0 0' }} />
    <ul className={classes.list}>
      {
        [
          { route: PLAY_ROUTE, label: () => 'New game', condition: () => true },
          { route: HOME_ROUTE, label: account => account.username, condition: () => account },
          { route: LOGOUT_ROUTE, label: () => 'Logout', condition: () => account },
        ]
          .filter((({ condition }) => condition()))
          .map(link =>
            <li className={classes.listItem} key={link.route}>
              <NavLink to={link.route} activeStyle={{ color: 'limegreen' }} exact>{link.label(account)}</NavLink>
            </li>,
          )
      }
    </ul>
  </nav>,
)
