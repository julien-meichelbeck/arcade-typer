import React from 'react'
import LoginForm from 'client/component/LoginForm'
import Text from 'client/component/Text'

export default () => (
  <div>
    <Text center component="div">
      <Text lead>You must be authenticated to join a game.</Text>
      <Text>{"It's easy, just choose a username and a password !"}</Text>
    </Text>
    <LoginForm />
  </div>
)
