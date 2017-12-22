import React from 'react'
import Button from 'client/component/Button'
import { SOLO_GAME_ROUTE } from 'shared/routes'

export default () => (
  <div style={{ display: 'flex', margin: '50px' }}>
    <div style={{ width: '50%', textAlign: 'center' }}>
      <Button to={SOLO_GAME_ROUTE}>SOLO</Button>
    </div>
    <div style={{ width: '50%', textAlign: 'center' }}>
      <Button>MULTIPLAYERS</Button>
    </div>
  </div>
)
