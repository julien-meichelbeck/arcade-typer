import React from 'react'
import recompact from 'shared/modules/recompact'
import meanBy from 'lodash/meanBy'
import Text from 'client/component/Text'
import provideObs from './History.obs'

export default recompact.compose(
  recompact.connectObs(provideObs),
  recompact.branch(({ histories }) => !histories, recompact.renderNothing),
)(({ histories }) => (
  <div>
    <Text lead>Your average speed is {Math.round(meanBy(histories, ({ speed }) => speed) * 100) / 100}</Text>
    <br />
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Speed</th>
        </tr>
      </thead>
      <tbody>
        {histories.map(history => (
          <tr key={history.created_at}>
            <td style={{ width: 250 }}>{history.created_at}</td>
            <td>{history.speed} WPM</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
))
