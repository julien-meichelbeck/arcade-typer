import 'isomorphic-fetch'

import React from 'react'
import { connect } from 'react-redux'

import recompact from 'shared/modules/recompact'
import { saveAccount } from 'shared/action/accounts'

export default recompact.compose(
  connect(
    () => ({}),
    dispatch => ({ dispatch }),
  ),
  recompact.withState('username', 'setUsername', ''),
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
  username,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label>Please choose a username</label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={({ target: { value } }) => setUsername(value)}
      />
    </div>
    <div>
      <input type="submit" value="Log In" />
    </div>
  </form>
))
