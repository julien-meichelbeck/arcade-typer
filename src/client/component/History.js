import React from 'react'
import moment from 'moment'
import recompact from 'shared/modules/recompact'
import meanBy from 'lodash/meanBy'
import Text from 'client/component/Text'
import injectSheet from 'react-jss'
import Container from 'client/component/Container'
import Banner from 'client/component/Banner'
import classNames from 'classnames'
import provideObs from './History.obs'

const styles = {
  root: {},
  table: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: 14,
    width: '100%',
    textAlign: 'left',
  },
  tr: {
    height: 30,
  },
  th: {
    color: 'rgb(170, 111, 252)',
  },
  title: {
    color: 'rgb(170, 111, 252)',
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
          <tr className={classNames([classes.th, classes.tr])}>
            <th>Date</th>
            <th>Position</th>
            <th>Speed</th>
          </tr>
        </thead>
        <tbody>
          {histories.map(history => (
            <tr key={history.created_at} className={classes.tr}>
              <td>{moment(history.created_at).format('MMMM Do YYYY, h:mm')}</td>
              <td>
                {history.position} {history.position === 1 ? '🏆' : null}
              </td>
              <td>{history.speed} WPM</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  </Banner>
))
