import 'isomorphic-fetch'

import React from 'react'
import { connect } from 'react-redux'
import recompact from 'shared/modules/recompact'
import { saveAccount } from 'shared/action/accounts'
import Button from 'client/component/Button'
import Input from 'client/component/Input'
import Text from 'client/component/Text'

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
      <Text lead>Please enter a username.</Text>
      <Input
        name="username"
        value={username}
        onChange={({ target: { value } }) => setUsername(value)}
      />
    </div>
    <br />
    <button type="submit" style={{ display: 'none' }} />
    <Button primary spaced onClick={handleSubmit}>Join</Button>
    <Button spaced>Cancel</Button>
  </form>
))
