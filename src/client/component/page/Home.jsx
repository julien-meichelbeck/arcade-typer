// @flow

import 'isomorphic-fetch'

import React from 'react'
import { connect } from 'react-redux'

import recompact from 'shared/modules/recompact'
import { saveAccount } from 'shared/action/accounts'

const LoginForm = recompact.compose(
  connect(
    () => ({}),
    dispatch => ({ dispatch }),
  ),
  recompact.withState('username', 'setUsername', ''),
  recompact.withState('password', 'setPassword', ''),
  recompact.withHandlers({
    handleSubmit: (({ dispatch, username, password }) => (event) => {
      event.preventDefault()
      fetch(`/login?username=${username}&password=${password}`, { method: 'POST', credentials: 'include' })
        .then(response => response.json())
        .then(data => dispatch(saveAccount(data.account)))
        .catch(error => console.log(error))
    }),
  }),
)(({
  setUsername,
  setPassword,
  username,
  password,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label>Username:</label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={({ target: { value } }) => setUsername(value)}
      />
    </div>
    <div>
      <label>Password:</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
      />
    </div>
    <div>
      <input type="submit" value="Log In" />
    </div>
  </form>
))

export default recompact.compose(
  connect(({ account }) => ({ account })),
)(({
  account,
}) => (
  <div>
    <h1>Home</h1>
    { !account ? <LoginForm /> : null }
  </div>
))
