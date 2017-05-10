import React from 'react'
import injectSheet from 'react-jss'

const styles = {
  root: {
    width: '100%',
    margin: '14px 0 14px',
  },
  username: {
    fontSize: 24,
    margin: '0 0 7px',
    fontFamily: "'Montserrat', sans-serif",
  },
  position: {
  },
  progress: {
    flex: '1 0 0',
    width: '100%',
    height: '10px',
    borderRadius: 5,
    border: '1px solid',
  },
  progressIn: {
    height: '100%',
    transition: '0.2s',
  },
  speedMeter: {
    paddingLeft: 14,
    fontFamily: "'Changa One', cursive",
    fontSize: 29,
    position: 'relative',
    top: '-9px',
  },
}

const progression = (progressValue, progressMax) => (
  `${Math.round((progressValue / progressMax) * 100)}%`
)

export default injectSheet(styles)(({
  username,
  progressValue,
  progressMax,
  speed = 0,
  position,
  classes,
  color,
}) => (
  <div className={classes.root} style={{ color }}>
    <p className={classes.username}>
      <span className={classes.position}>
        { position > 0 ? `${position}. ` : null }
      </span>
      {username}
    </p>
    <div style={{ display: 'flex' }}>
      <div className={classes.progress}>
        <div
          className={classes.progressIn}
          style={{
            width: progression(progressValue, progressMax),
            backgroundColor: color,
          }}
        />
      </div>
      <div className={classes.speedMeter}>{speed} WPM</div>
    </div>
  </div>
))
