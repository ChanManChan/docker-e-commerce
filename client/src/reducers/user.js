import * as types from '../types'

const LOGIN_INITIAL_STATE = {
  loading: false,
  userInfo: null,
  error: null
}

const REGISTER_INITIAL_STATE = {
  loading: false,
  userInfo: null,
  error: null
}

const DETAILS_INITIAL_STATE = {
  loading: false,
  user: {},
  error: null
}

const PROFILE_UPDATE_INITIAL_STATE = {
  userInfo: null,
  loading: false,
  success: false,
  error: null
}

export const userLoginReducer = (state = LOGIN_INITIAL_STATE, action) => {
  switch(action.type) {
    case types.USER_LOGIN_REQUEST:
      return { ...state, loading: true }
    case types.USER_LOGIN_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload }
    case types.USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload }
    case types.USER_LOGOUT:
      return { ...state, userInfo: null }
    default:
      return state
  }
}

export const userRegisterReducer = (state = REGISTER_INITIAL_STATE, action) => {
  switch(action.type) {
    case types.USER_REGISTER_REQUEST:
      return { ...state, loading: true }
    case types.USER_REGISTER_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload }
    case types.USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload }
    case types.USER_LOGOUT:
      return { ...state, userInfo: null }
    default:
      return state
  }
}

export const userDetailsReducer = (state = DETAILS_INITIAL_STATE, action) => {
  switch(action.type) {
    case types.USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case types.USER_DETAILS_SUCCESS:
      return { ...state, loading: false, user: action.payload }
    case types.USER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload }
    case types.USER_DETAILS_RESET:
      return { loading: false, user: {}, error: null }
    default:
      return state
  }
}

export const userUpdateProfileReducer = (state = PROFILE_UPDATE_INITIAL_STATE, action) => {
  switch(action.type) {
    case types.USER_UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true }
    case types.USER_UPDATE_PROFILE_SUCCESS:
      return { ...state, loading: false, success: true, userInfo: action.payload }
    case types.USER_UPDATE_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
