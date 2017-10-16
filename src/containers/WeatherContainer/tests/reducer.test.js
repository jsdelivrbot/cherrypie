import { fromJS } from 'immutable'
import initialState from '../initialState'
import weatherContainerReducer from '../reducer'
import * as a from '../actions'
import * as c from '../constants'
import * as m from './mockdata'

const state = initialState

describe('WeatherContainer:reducer', () => {
  it('should return the initial state', () => {
    expect(weatherContainerReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle weatherDataFetchStart action correctly', () => {
    expect(weatherContainerReducer(state, a.weatherDataFetchStart())).toEqual(state)
  })

  it('should handle weatherDataFetchSuccess action correctly with a payload', () => {
    const expectedState = state.set(c.SELECTOR_WEATHER_RESULTS, m.mockData)
    expect(weatherContainerReducer(
      state,
      a.weatherDataFetchSuccess(m.mockData)
    )).toEqual(expectedState)
  })

  it('should handle weatherDataFetchSuccess action correctly w/o a payload', () => {
    const expectedState = state.set(c.SELECTOR_WEATHER_RESULTS, fromJS({}))
    expect(weatherContainerReducer(state, a.weatherDataFetchSuccess())).toEqual(expectedState)
  })

  it('should handle weatherDataFetchFailure action correctly with a load', () => {
    const expectedState = state.set(c.SELECTOR_WEATHER_ERROR, m.mockError)
    expect(weatherContainerReducer(
      state,
      a.weatherDataFetchFailure(m.mockError)
    )).toEqual(expectedState)
  })

  it('should handle weatherDataFetchFailure action correctly w/o a load', () => {
    const expectedState = state.set(c.SELECTOR_WEATHER_ERROR, '')
    expect(weatherContainerReducer(state, a.weatherDataFetchFailure(''))).toEqual(expectedState)
  })

  it('handles the weatherDataFetchStart action snapshot', () => {
    expect(weatherContainerReducer({}, a.weatherDataFetchStart())).toMatchSnapshot()
  })

  it('handles the weatherDataFetchSuccess action snapshot', () => {
    expect(weatherContainerReducer(state, a.weatherDataFetchSuccess(m.mockUsers))).toMatchSnapshot()
  })

  it('handles the weatherDataFetchFailure action snapshot', () => {
    expect(weatherContainerReducer(state, a.weatherDataFetchFailure(m.mockError))).toMatchSnapshot()
  })
})
