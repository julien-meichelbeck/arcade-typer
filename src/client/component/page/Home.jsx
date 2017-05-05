import React from 'react'
import { connect } from 'react-redux'

import recompact from 'shared/modules/recompact'
import LoginForm from 'client/component/page/LoginForm'

export default recompact.compose(
  connect(({ account }) => ({ account })),
)(({
  account,
}) => (
  <div>
    { !account ? <LoginForm /> : null }
  </div>
))
