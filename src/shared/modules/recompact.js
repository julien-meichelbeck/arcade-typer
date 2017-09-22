// Standards utilities
import branch from 'recompact/branch'
import componentFromProp from 'recompact/componentFromProp'
import compose from 'recompact/compose'
import createEagerElement from 'recompact/createEagerElement'
import createEagerFactory from 'recompact/createEagerFactory'
import createHelper from 'recompact/createHelper'
import defaultProps from 'recompact/defaultProps'
import debug from 'recompact/debug'
import connectObs from 'recompact/connectObs'
import flattenProp from 'recompact/flattenProp'
import getContext from 'recompact/getContext'
import lifecycle from 'recompact/lifecycle'
import mapProps from 'recompact/mapProps'
import onlyUpdateForKeys from 'recompact/onlyUpdateForKeys'
import pure from 'recompact/pure'
import renameProp from 'recompact/renameProp'
import renderComponent from 'recompact/renderComponent'
import renderNothing from 'recompact/renderNothing'
import setDisplayName from 'recompact/setDisplayName'
import setPropTypes from 'recompact/setPropTypes'
import setStatic from 'recompact/setStatic'
import shouldUpdate from 'recompact/shouldUpdate'
import toClass from 'recompact/toClass'
import withContext from 'recompact/withContext'
import withHandlers from 'recompact/withHandlers'
import withProps from 'recompact/withProps'
import withPropsOnChange from 'recompact/withPropsOnChange'
import setObservableConfig from 'recompact/setObservableConfig'
import rxjsObservableConfig from 'recompact/rxjsObservableConfig'
import withObs from 'recompact/withObs'
import omitProps from 'recompact/omitProps'
import withState from 'recompact/withState'
import Rx from 'rxjs/Rx'

setObservableConfig(rxjsObservableConfig)

const eventToValue = eventName =>
  withHandlers({
    [eventName]: props => event => props[eventName](event.target.value),
  })

const pluckObs = obs =>
  connectObs(observables =>
    obs.reduce((acc, elem) => {
      const propName = elem.slice(0, elem.length - 1)
      acc[propName] = observables[elem]
      return acc
    }, {}),
  )

Rx.Observable.prototype.debug = function debug(name, selector = x => x) {
  return this.do(value => {
    // It's not supposed to be used in production, but to be safe.
    if (process.env.NODE_ENV !== 'production') {
      console.info(name, selector(value))
    }
  })
}

export default {
  branch,
  componentFromProp,
  compose,
  connectObs,
  createEagerElement,
  createEagerFactory,
  createHelper,
  debug,
  eventToValue,
  defaultProps,
  flattenProp,
  getContext,
  lifecycle,
  mapProps,
  onlyUpdateForKeys,
  pure,
  renameProp,
  renderComponent,
  renderNothing,
  setDisplayName,
  setPropTypes,
  setStatic,
  shouldUpdate,
  toClass,
  withContext,
  withHandlers,
  withProps,
  withPropsOnChange,
  withState,
  withObs,
  pluckObs,
  omitProps,
}
