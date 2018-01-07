import deepFreeze from 'deep-freeze'
import counterReducer from './counterReducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  it('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  it('increments good reviews', () => {
      const action = {
          type: 'GOOD'
      }
      deepFreeze(initialState)
      const newState = counterReducer(initialState, action)
      expect(newState.good).toEqual(1)
  })

  it('increments bad reviews', () => {
    const action = {
        type: 'BAD'
    }
    deepFreeze(initialState)
    const newState = counterReducer(initialState, action)
    expect(newState.bad).toEqual(1)
  })

  it('increments ok reviews', () => {
    const action = {
        type: 'OK'
    }
    deepFreeze(initialState)
    const newState = counterReducer(initialState, action)
    expect(newState.ok).toEqual(1)
  })

  it('zeroes reviews', () => {
    const ok = {
        type: 'OK'
    }
    const bad = {
        type: 'BAD'
    }
    const good = {
        type: 'GOOD'
    }
    deepFreeze(initialState)
    let newState = counterReducer(initialState, ok)
    newState = counterReducer(newState, bad)
    newState = counterReducer(newState, good)
    const zero = {
        type: 'ZERO'
    }
    newState = counterReducer(newState, zero)
    expect(newState.ok).toEqual(0)
    expect(newState.good).toEqual(0)
    expect(newState.bad).toEqual(0)
  })
})