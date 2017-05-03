// @flow

import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import recompact from 'shared/modules/recompact'
import {
  HOME_ROUTE,
  PLAY_ROUTE,
} from 'shared/routes'

export default recompact.compose(
  connect(({ account }) => ({ account })),
)(({
  account,
}) =>
  <nav>
    { account ? `Connected as ${account.username}` : 'Unknown player.' }
    <ul>
      {[
        { route: HOME_ROUTE, label: 'Home' },
        { route: PLAY_ROUTE, label: 'New game' },
      ].map(link => (
        <li key={link.route}>
          <NavLink to={link.route} activeStyle={{ color: 'limegreen' }} exact>{link.label}</NavLink>
        </li>
      ))}
    </ul>
  </nav>)
