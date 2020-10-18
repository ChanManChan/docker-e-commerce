import * as types from '../types'

const CREATE_ORDER_INITIAL_STATE = {
  loading: false,
  error: null,
  order: {},
  success: false
}

const ORDER_DETAILS_INITIAL_STATE = {
  loading: true,
  error: null,
  order: {}
}

const ORDER_PAY_INITIAL_STATE = {
  loading: false,
  success: false,
  error: null
}

const MY_ORDER_LIST_INITIAL_STATE = {
  loading: false,
  orders: [],
  error: null
}

export const orderCreateReducer = (state = CREATE_ORDER_INITIAL_STATE, action) => {
  switch(action.type) {
    case types.ORDER_CREATE_REQUEST:
      return { ...state, loading: true }
    case types.ORDER_CREATE_SUCCESS:
      return { ...state, loading: false, success: true, order: action.payload }
    case types.ORDER_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderDetailsReducer = (state = ORDER_DETAILS_INITIAL_STATE, action) => {
  switch(action.type) {
    case types.ORDER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case types.ORDER_DETAILS_SUCCESS:
      return { ...state, loading: false, order: action.payload }
    case types.ORDER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderPayReducer = (state = ORDER_PAY_INITIAL_STATE, action) => {
  switch(action.type) {
    case types.ORDER_PAY_REQUEST:
      return { ...state, loading: true }
    case types.ORDER_PAY_SUCCESS:
      return { ...state, loading: false, success: true }
    case types.ORDER_PAY_FAIL:
      return { ...state, loading: false, error: action.payload }
    case types.ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const listMyOrdersReducer = (state = MY_ORDER_LIST_INITIAL_STATE, action) => {
  switch(action.type) {
    case types.LIST_MY_ORDERS_REQUEST:
      return { ...state, loading: true }
    case types.LIST_MY_ORDERS_SUCCESS:
      return { ...state, loading: false, orders: action.payload }
    case types.LIST_MY_ORDERS_FAIL:
      return { ...state, loading: false, error: action.payload }
    case types.LIST_MY_ORDERS_RESET:
      return { loading: false, orders: [], error: null }
    default:
      return state
  }
}
