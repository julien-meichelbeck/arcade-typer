import React from 'react'

export default ({
  username,
  progressValue,
  progressMax,
  speed = 0,
}) => (
  <div>
    <p>{username} ({speed} WPM)</p>
    <progress value={progressValue} max={progressMax} style={{ width: '100%' }} />
  </div>
)
