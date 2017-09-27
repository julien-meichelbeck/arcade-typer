import React from 'react'
import recompact from 'shared/modules/recompact'
import meanBy from 'lodash/meanBy'
import Text from 'client/component/Text'
import injectSheet from 'react-jss'
import Container from 'client/component/Container'
import Banner from 'client/component/Banner'
import provideObs from './History.obs'

const styles = {
  root: {},
  table: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: 14,
    width: '100%',
    textAlign: 'left',
  },
  td: {
    padding: '8px 0',
  },
  th: {
    color: 'rgb(170, 111, 252)',
  },
  title: {
    color: 'rgb(43, 255, 234)',
    fontFamily: "'Press Start 2P', cursive",
    textAlign: 'center',
    margin: '20px 0',
  },
  container: {
    paddingTop: 14,
    paddingBottom: 14,
  },
}

const EmptyHistory = () => (
  <Text lead center error>
    <br />
    {"You haven't played any game yet!"}
  </Text>
)

export default recompact.compose(
  recompact.connectObs(provideObs),
  recompact.branch(({ histories }) => !histories || !histories.length, recompact.renderComponent(EmptyHistory)),
  injectSheet(styles)
)(({ histories, classes }) => (
  <Banner className={classes.root}>
    <Container className={classes.container}>
      <Text lead className={classes.title}>
        AVERAGE SPEED: {Math.round(meanBy(histories, ({ speed }) => speed) * 100) / 100} WPM
      </Text>
      <br />
      <table className={classes.table}>
        <thead>
          <tr className={classes.th}>
            <th className={classes.td}>Date</th>
            <th className={classes.td}>Position</th>
            <th className={classes.td}>Speed</th>
          </tr>
        </thead>
        <tbody>
          {histories.map(history => (
            <tr key={history.created_at}>
              <td className={classes.td}>{history.created_at}</td>
              <td className={classes.td}>
                {history.position} {history.position === 1 ? '🏆' : null}
              </td>
              <td className={classes.td}>{history.speed} WPM</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  </Banner>
))
