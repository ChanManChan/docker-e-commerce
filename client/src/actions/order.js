import * as types from '../types'

export const createOrder = order => async (dispatch, getState) => {
  dispatch({ type: types.ORDER_CREATE_REQUEST })

  const { userLogin: { userInfo: { token }}} = getState()

  const response = await fetch(
    '/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(order)
    }).then(res => res.json())

  if(response.message) {
    dispatch({ type: types.ORDER_CREATE_FAIL, payload: response.message })
  } else {
    dispatch({ type: types.ORDER_CREATE_SUCCESS, payload: response })
  }
}

export const getOrderDetails = orderId => async (dispatch, getState) => {
  dispatch({ type: types.ORDER_DETAILS_REQUEST })

  const { userLogin: { userInfo: { token }}} = getState()

  const response = await fetch(
    `/api/orders/${orderId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json())

  if(response.message) {
    dispatch({ type: types.ORDER_DETAILS_FAIL, payload: response.message })
  } else {
    dispatch({ type: types.ORDER_DETAILS_SUCCESS, payload: response })
  }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  dispatch({ type: types.ORDER_PAY_REQUEST })

  const { userLogin: { userInfo: { token }}} = getState()

  const response = await fetch(
    `/api/orders/${orderId}/pay`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(paymentResult)
    }).then(res => res.json())

  if(response.message) {
    dispatch({ type: types.ORDER_PAY_FAIL, payload: response.message })
  } else {
    dispatch({ type: types.ORDER_PAY_SUCCESS })
  }
}

export const listMyOrders = () => async (dispatch, getState) => {
  dispatch({ type: types.LIST_MY_ORDERS_REQUEST })

  const { userLogin: { userInfo: { token }}} = getState()

  const response = await fetch(
    '/api/orders/myorders', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
    }).then(res => res.json())

  if(response.message) {
    dispatch({ type: types.LIST_MY_ORDERS_FAIL, payload: response.message })
  } else {
    dispatch({ type: types.LIST_MY_ORDERS_SUCCESS, payload: response })
  }
}
