import * as types from './constants/actionTypes'
import * as states from './constants/toggleStates'

const init = (key, config) => {
  return { type: types.TOGGLER_INIT, key, config }
}

const toggleInit = (key, config) => {
  return (dispatch, getState) => {
    const toggler = getState().toggler
    if (toggler[key]) return
    return dispatch(init(key, config))
  }
}

const setState = (key, value) => {
  return { type: types.TOGGLER_SET_STATE, key, value }
}

const setPercentOpen = (key, value) => {
  return { type: types.TOGGLER_SET_PERCENT_OPEN, key, value }
}

const tick = (key) => {
  return (dispatch, getState) => {
    const { toggleState, percent } = getState().toggler[key]
    switch (toggleState) {
      case states.OPENING:
        if (percent < 100) {
          dispatch(setPercentOpen(key, percent + 10))
          setTimeout(() => dispatch(tick(key)), 5)
        } else {
          dispatch(setPercentOpen(key, 100))
          dispatch(setState(key, states.OPEN))
        }
        break
      case states.CLOSING:
        if (percent > 0) {
          dispatch(setPercentOpen(key, percent - 10))
          setTimeout(() => dispatch(tick(key)), 5)
        } else {
          dispatch(setPercentOpen(key, 0))
          dispatch(setState(key, states.CLOSED))
        }
        break
    }
  }
}

const toggleOpen = (key) => {
  return (dispatch, getState) => {
    dispatch(setState(key, states.OPENING))
    dispatch(tick(key))
  }
}

const toggleClose = (key) => {
  return (dispatch, getState) => {
    dispatch(setState(key, states.CLOSING))
    dispatch(tick(key))
  }
}

const toggle = (key) => {
  return (dispatch, getState) => {
    const { toggleState } = getState().toggler[key]
    switch (toggleState) {
      case states.OPEN:
      case states.OPENING:
        dispatch(toggleClose(key))
        break
      case states.CLOSED:
      case states.CLOSING:
        dispatch(toggleOpen(key))
        break
    }
  }
}

export {
  toggleInit,
  toggle,
  toggleOpen,
  toggleClose,
}
