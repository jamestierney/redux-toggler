import {
  TOGGLER_INIT,
  TOGGLER_SET_STATE,
  TOGGLER_SET_PERCENT_OPEN,
} from './constants/actionTypes'
import {
  OPEN,
  CLOSED,
  OPENING,
  CLOSING,
} from './constants/toggleStates'

const init = (key, config) => {
  return { type: TOGGLER_INIT, key, config }
}

const setState = (key, value) => {
  return { type: TOGGLER_SET_STATE, key, value }
}

const setPercentOpen = (key, value) => {
  return { type: TOGGLER_SET_PERCENT_OPEN, key, value }
}

const toggleInit = (key, config) => {
  return (dispatch, getState) => {
    const toggler = getState().toggler
    if (toggler[key]) return
    return dispatch(init(key, config))
  }
}

// TODO: handle custom duration and complex animation types
const tick = (key) => {
  return (dispatch, getState) => {
    const { toggleState, percent } = getState().toggler[key]
    switch (toggleState) {
      case OPENING:
        if (percent < 100) {
          dispatch(setPercentOpen(key, percent + 10))
          setTimeout(() => dispatch(tick(key)), 5)
        } else {
          dispatch(setPercentOpen(key, 100))
          dispatch(setState(key, OPEN))
        }
        break
      case CLOSING:
        if (percent > 0) {
          dispatch(setPercentOpen(key, percent - 10))
          setTimeout(() => dispatch(tick(key)), 5)
        } else {
          dispatch(setPercentOpen(key, 0))
          dispatch(setState(key, CLOSED))
        }
        break
    }
  }
}

const toggleOpen = (key) => {
  return (dispatch, getState) => {
    dispatch(setState(key, OPENING))
    dispatch(tick(key))
  }
}

const toggleClose = (key) => {
  return (dispatch, getState) => {
    dispatch(setState(key, CLOSING))
    dispatch(tick(key))
  }
}

const toggleSetOpen = (key) => {
  return (dispatch, getState) => {
    dispatch(setState(key, OPEN))
    dispatch(setPercentOpen(key, 100))
  }
}

const toggleSetClosed = (key) => {
  return (dispatch, getState) => {
    dispatch(setState(key, CLOSED))
    dispatch(setPercentOpen(key, 0))
  }
}

const toggle = (key) => {
  return (dispatch, getState) => {
    const { toggleState } = getState().toggler[key]
    switch (toggleState) {
      case OPEN:
      case OPENING:
        dispatch(toggleClose(key))
        break
      case CLOSED:
      case CLOSING:
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
  toggleSetOpen,
  toggleSetClosed,
}
