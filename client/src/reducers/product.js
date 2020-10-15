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
