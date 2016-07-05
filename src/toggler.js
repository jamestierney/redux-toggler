import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as toggleActions from './actions'
import * as states from './constants/toggleStates'

const defaultState = {
  toggleState: states.CLOSED,
  percent: 0,
}

export default toggler = (key, config) => {

  const actions = {
    toggleInit: toggleActions.toggleInit.bind(null, key),
    toggle: toggleActions.toggle.bind(null, key),
    toggleOpen: toggleActions.toggleOpen.bind(null, key),
    toggleClose: toggleActions.toggleClose.bind(null, key),
    toggleSetOpen: toggleActions.toggleSetOpen.bind(null, key),
    toggleSetClosed: toggleActions.toggleSetClosed.bind(null, key),
  }

  return (WrappedComponent) => {
    class Wrapper extends Component {
        componentWillMount() {
          this.props.toggleInit(key, config)
        }
        render() {
          return (
            <WrappedComponent
            {...this.props}
            />
          )
        }
      }
      return connect(({toggler}) => {
          return { toggler: toggler[key] ? toggler[key] : defaultState }
        },
        (dispatch) => {
          return (bindActionCreators(actions, dispatch))
        })(Wrapper)
    }
}
