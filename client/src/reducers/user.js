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

const USER_LIST_INITIAL_STATE = {
  loading: false,
  error: null,
  users: []
}

const USER_DELETE_INITIAL_STATE = {
  loading: false,
  error: null,
  success: false
}

const USER_BY_ID_INITIAL_STATE = {
  loading: false,
  error: null,
  user: {}
}

const USER_UPDATE_INITIAL_STATE = {
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
      return DETAILS_INITIAL_STATE
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

export const userListReducer = (state = USER_LIST_INITIAL_STATE, action) => {
  switch(action.type) {
    case types.USER_LIST_REQUEST:
      return { ...state, loading: true }
    case types.USER_LIST_SUCCESS:
      return { ...state, loading: false, users: action.payload }
    case types.USER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload }
    case types.USER_LIST_RESET:
      return USER_LIST_INITIAL_STATE
    default:
      return state
  }
}

export const userDeleteReducer = (state = USER_DELETE_INITIAL_STATE, action) => {
  switch(action.type) {
    case types.USER_DELETE_REQUEST:
      return { ...state, loading: true }
    case types.USER_DELETE_SUCCESS:
      return { ...state, loading: false, success: true }
    case types.USER_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const userByIdReducer = (state = USER_BY_ID_INITIAL_STATE, action) => {
  switch(action.type) {
    case types.USER_BY_ID_REQUEST:
      return { ...state, loading: true }
    case types.USER_BY_ID_SUCCESS:
      return { ...state, loading: false, user: action.payload }
    case types.USER_BY_ID_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const userUpdateReducer = (state = USER_UPDATE_INITIAL_STATE, action) => {
  switch(action.type) {
    case types.USER_UPDATE_REQUEST:
      return { ...state, loading: true }
    case types.USER_UPDATE_SUCCESS:
      return { ...state, loading: false, success: true }
    case types.USER_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload }
    case types.USER_UPDATE_RESET:
      return USER_UPDATE_INITIAL_STATE
    default:
      return state
  }
}
