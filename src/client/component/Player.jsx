import React from 'react'

export default ({
  username,
  progressValue,
  progressMax,
  speed = 0,
  position,
}) => (
  <div>
    <p>{username} { position > 0 ? position : null }</p>
    <div style={{ display: 'flex' }}>
      <progress value={progressValue} max={progressMax} style={{ flex: '1 0 0' }} />
      <div>{speed} WPM</div>
    </div>
  </div>
)
