import * as types from '../types'

export const listProducts = (keyword = '', pageNumber = 1) => async dispatch => {
  dispatch({ type: types.PRODUCT_LIST_REQUEST })

  const response = await fetch(
    `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`, {
      method: 'GET'
    }).then(res => res.json())

  if(response.errorMessage) {
    dispatch({ type: types.PRODUCT_LIST_FAIL, payload: response.errorMessage })
  } else {
    dispatch({ type: types.PRODUCT_LIST_SUCCESS, payload: response })
  }
}

export const fetchProductDetails = (id) => async dispatch => {
  dispatch({ type: types.PRODUCT_DETAILS_REQUEST })
  const response = await fetch(`/api/products/${id}`, { method: 'GET' }).then(res => res.json())
  if(response.errorMessage) {
    dispatch({ type: types.PRODUCT_DETAILS_FAIL, payload: response.errorMessage })
  } else {
    dispatch({ type: types.PRODUCT_DETAILS_SUCCESS, payload: response })
  }
}

export const deleteProduct = productId => async (dispatch, getState) => {
  dispatch({ type: types.PRODUCT_DELETE_REQUEST })
  try {
    const { userLogin: { userInfo: { token }}} = getState()

    const response = await fetch(
      `/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => res.json())

      if(response.errorMessage) {
        dispatch({ type: types.PRODUCT_DELETE_FAIL, payload: response.errorMessage })
      } else {
        dispatch({ type: types.PRODUCT_DELETE_SUCCESS })
      }
  } catch (e) {
    dispatch({ type: types.PRODUCT_DELETE_FAIL, payload: e.message })
  }
}

export const createProduct = () => async (dispatch, getState) => {
  dispatch({ type: types.PRODUCT_CREATE_REQUEST })
  try {
    const { userLogin: { userInfo: { token }}} = getState()

    const response = await fetch(
      `/api/products/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({})
      }).then(res => res.json())

      if(response.errorMessage) {
        dispatch({ type: types.PRODUCT_CREATE_FAIL, payload: response.errorMessage })
      } else {
        dispatch({ type: types.PRODUCT_CREATE_SUCCESS, payload: response })
      }
  } catch (e) {
    dispatch({ type: types.PRODUCT_CREATE_FAIL, payload: e.message })
  }
}

export const updateProduct = product => async (dispatch, getState) => {
  dispatch({ type: types.PRODUCT_UPDATE_REQUEST })
  try {
    const { userLogin: { userInfo: { token }}} = getState()

    const response = await fetch(
      `/api/products/${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
      }).then(res => res.json())

      if(response.errorMessage) {
        dispatch({ type: types.PRODUCT_UPDATE_FAIL, payload: response.errorMessage })
      } else {
        dispatch({ type: types.PRODUCT_UPDATE_SUCCESS, payload: response })
      }
  } catch (e) {
    dispatch({ type: types.PRODUCT_UPDATE_FAIL, payload: e.message })
  }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
  dispatch({ type: types.PRODUCT_CREATE_REVIEW_REQUEST })
  try {
    const { userLogin: { userInfo: { token }}} = getState()

    const response = await fetch(
      `/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(review)
      }).then(res => res.json())

      if(response.errorMessage) {
        dispatch({ type: types.PRODUCT_CREATE_REVIEW_FAIL, payload: response.errorMessage })
      } else {
        dispatch({ type: types.PRODUCT_CREATE_REVIEW_SUCCESS })
      }
  } catch (e) {
    dispatch({ type: types.PRODUCT_CREATE_REVIEW_FAIL, payload: e.message })
  }
}

export const listTopProducts = () => async dispatch => {
  dispatch({ type: types.PRODUCT_TOP_REQUEST })

  const response = await fetch(
    '/api/products/top', {
      method: 'GET'
    }).then(res => res.json())

  if(response.errorMessage) {
    dispatch({ type: types.PRODUCT_TOP_FAIL, payload: response.errorMessage })
  } else {
    dispatch({ type: types.PRODUCT_TOP_SUCCESS, payload: response })
  }
}
