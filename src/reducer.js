import * as types from './constants/actionTypes'
import * as states from './constants/toggleStates'

const initialState = {
}

const defaultState = {
  toggleState: states.CLOSED,
  percent: 0,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {

    case types.TOGGLER_INIT:
      var key = action.key
      if (state[key]) return state
      var newState = Object.assign({}, state)
      newState[key] = Object.assign({}, defaultState)
      return newState

    case types.TOGGLER_SET_STATE:
      var key = action.key
      var item = {...state[key], toggleState: action.value}
      var newState = Object.assign({}, state)
      newState[key] = item
      return newState

    case types.TOGGLER_SET_PERCENT_OPEN:
      var percent = action.value < 0
        ? 0
        : action.value > 100
          ? 100
          : parseFloat(action.value)
      var key = action.key
      var item = {...state[key], percent: action.value}
      var newState = Object.assign({}, state)
      newState[key] = item
      return newState

      // return {
      //   ...state,
      //   percent,
      // }

    default:
      return state
  }
}
