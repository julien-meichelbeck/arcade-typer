import React from 'react'
import Text from 'client/component/Text'
import Button from 'client/component/Button'
import injectSheet from 'react-jss'

const styles = {
  container: {
    display: 'flex',
    maxWidth: '700px',
    width: '100%',
    margin: 'auto',
  },
}

export default injectSheet(styles)(({ classes }) => (
  <div>
    <Text uiStyle="title">New game</Text>
    <div className={classes.container}>
      <Button primary>Solo</Button>
      <Button primary>Multiplayers</Button>
    </div>
  </div>
))
