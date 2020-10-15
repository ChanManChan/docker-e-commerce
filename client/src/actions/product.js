import * as types from '../types'

export const listProducts = () => async dispatch => {
  dispatch({ type: types.PRODUCT_LIST_REQUEST })
  const response = await fetch('/api/products', { method: 'GET' }).then(res => res.json())
  if(response.message) {
    dispatch({
      type: types.PRODUCT_LIST_FAIL,
      payload: response.message
    })
  } else {
    dispatch({ type: types.PRODUCT_LIST_SUCCESS, payload: response })
  }
}

export const fetchProductDetails = (id) => async dispatch => {
  dispatch({ type: types.PRODUCT_DETAILS_REQUEST })
  const response = await fetch(`/api/products/${id}`, { method: 'GET' }).then(res => res.json())
  if(response.message) {
    dispatch({
      type: types.PRODUCT_DETAILS_FAIL,
      payload: response.message
    })
  } else {
    dispatch({ type: types.PRODUCT_DETAILS_SUCCESS, payload: response })
  }
}
