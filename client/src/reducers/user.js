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
