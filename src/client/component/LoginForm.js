import React from 'react'
import recompact from 'shared/modules/recompact'
import Button from 'client/component/Button'
import FormGroup from 'client/component/FormGroup'
import Input from 'client/component/Input'
import { withRouter } from 'react-router'
import provideObs from './LoginForm.obs'

export default recompact.compose(
  withRouter,
  recompact.pluckObs(['currentAccount$']),
  recompact.branch(({ currentAccount }) => currentAccount, () => () => <p>Connected.</p>),
  recompact.withState('username', 'onUsernameChange', ''),
  recompact.withState('password', 'onPasswordChange', ''),
  recompact.connectObs(provideObs),
  recompact.eventToValue('onUsernameChange'),
  recompact.eventToValue('onPasswordChange'),
  recompact.withHandlers({
    onSubmit: ({ onSubmit }) => event => {
      event.preventDefault()
      onSubmit()
    },
  }),
)(({ onUsernameChange, username, password, onPasswordChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <FormGroup label="Username">
      <Input name="username" value={username} onChange={onUsernameChange} />
    </FormGroup>
    <FormGroup label="Password">
      <Input type="password" name="password" value={password} onChange={onPasswordChange} />
    </FormGroup>
    <br />
    <button type="submit" style={{ display: 'none' }} />
    <Button primary spaced onClick={onSubmit}>
      Join
    </Button>
    <Button spaced>Cancel</Button>
  </form>
))
