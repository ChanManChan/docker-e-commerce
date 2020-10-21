import * as types from '../types'

const PRODUCT_LIST_INITIAL_STATE = {
  loading: false,
  products: [],
  error: null
}

const PRODUCT_DETAILS_INITIAL_STATE = {
  loading: false,
  product: {
    reviews: []
  },
  error: null
}

const PRODUCT_DELETE_INITIAL_STATE = {
  loading: false,
  error: null,
  success: false
}

const PRODUCT_CREATE_INITIAL_STATE = {
  loading: false,
  error: null,
  product: {},
  success: false
}

const PRODUCT_UPDATE_INITIAL_STATE = {
  loading: false,
  error: null,
  product: {},
  success: false
}

export const productListReducer = (state = PRODUCT_LIST_INITIAL_STATE, action) => {
  switch(action.type) {
    case types.PRODUCT_LIST_REQUEST:
      return { ...state, loading: true }
    case types.PRODUCT_LIST_SUCCESS:
      return { ...state, loading: false, products: action.payload }
    case types.PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDetailsReducer = (state = PRODUCT_DETAILS_INITIAL_STATE, action) => {
  switch(action.type) {
    case types.PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case types.PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: action.payload }
    case types.PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDeleteReducer = (state = PRODUCT_DELETE_INITIAL_STATE, action) => {
  switch(action.type) {
    case types.PRODUCT_DELETE_REQUEST:
      return { ...state, loading: true }
    case types.PRODUCT_DELETE_SUCCESS:
      return { ...state, loading: false, success: true }
    case types.PRODUCT_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const productCreateReducer = (state = PRODUCT_CREATE_INITIAL_STATE, action) => {
  switch(action.type) {
    case types.PRODUCT_CREATE_REQUEST:
      return { ...state, loading: true }
    case types.PRODUCT_CREATE_SUCCESS:
      return { ...state, loading: false, success: true, product: action.payload }
    case types.PRODUCT_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload }
    case types.PRODUCT_CREATE_RESET:
      return { loading: false, error: null, success: false, product: {} }
    default:
      return state
  }
}

export const productUpdateReducer = (state = PRODUCT_UPDATE_INITIAL_STATE, action) => {
  switch(action.type) {
    case types.PRODUCT_UPDATE_REQUEST:
      return { ...state, loading: true }
    case types.PRODUCT_UPDATE_SUCCESS:
      return { ...state, loading: false, success: true, product: action.payload }
    case types.PRODUCT_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload }
    case types.PRODUCT_UPDATE_RESET:
      return { loading: false, error: null, success: false, product: {} }
    default:
      return state
  }
}
