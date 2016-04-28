import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as toggleActions from './actions'
import * as states from './constants/toggleStates'

const defaultState = {
  toggleState: states.CLOSED,
  percent: 0,
}

export default toggler = (key, config) => {
  const toggle = toggleActions.toggle.bind(null, key)
  const actions = { toggle }
  return connect(
    ({toggler}) => {
      return { toggler: toggler[key] ? toggler[key] : defaultState }
    },
    (dispatch) => {
      dispatch(toggleActions.init(key, config))
      return (bindActionCreators(actions, dispatch))
    }
  )
}
