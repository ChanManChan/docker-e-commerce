import * as types from '../types'

export const createOrder = order => async (dispatch, getState) => {
  dispatch({ type: types.ORDER_CREATE_REQUEST })
  try {
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

    if(response.errorMessage) {
      dispatch({ type: types.ORDER_CREATE_FAIL, payload: response.errorMessage })
    } else {
      dispatch({ type: types.ORDER_CREATE_SUCCESS, payload: response })
    }
  } catch (e) {
    dispatch({ type: types.ORDER_CREATE_FAIL, payload: e.message })
  }
}

export const getOrderDetails = orderId => async (dispatch, getState) => {
  dispatch({ type: types.ORDER_DETAILS_REQUEST })
  try {
    const { userLogin: { userInfo: { token }}} = getState()

    const response = await fetch(
      `/api/orders/${orderId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => res.json())

    if(response.errorMessage) {
      dispatch({ type: types.ORDER_DETAILS_FAIL, payload: response.errorMessage })
    } else {
      dispatch({ type: types.ORDER_DETAILS_SUCCESS, payload: response })
    }
  } catch (e) {
    dispatch({ type: types.ORDER_DETAILS_FAIL, payload: e.message })
  }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  dispatch({ type: types.ORDER_PAY_REQUEST })
  try {
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

    if(response.errorMessage) {
      dispatch({ type: types.ORDER_PAY_FAIL, payload: response.errorMessage })
    } else {
      dispatch({ type: types.ORDER_PAY_SUCCESS })
    }
  } catch (e) {
    dispatch({ type: types.ORDER_PAY_FAIL, payload: e.message })
  }
}

export const deliverOrder = orderId => async (dispatch, getState) => {
  dispatch({ type: types.ORDER_DELIVER_REQUEST })
  try {
    const { userLogin: { userInfo: { token }}} = getState()

    const response = await fetch(
      `/api/orders/${orderId}/deliver`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => res.json())

    if(response.errorMessage) {
      dispatch({ type: types.ORDER_DELIVER_FAIL, payload: response.errorMessage })
    } else {
      dispatch({ type: types.ORDER_DELIVER_SUCCESS })
    }
  } catch (e) {
    dispatch({ type: types.ORDER_DELIVER_FAIL, payload: e.message })
  }
}

export const listMyOrders = () => async (dispatch, getState) => {
  dispatch({ type: types.LIST_MY_ORDERS_REQUEST })
  try {
    const { userLogin: { userInfo: { token }}} = getState()

    const response = await fetch(
      '/api/orders/myorders', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        },
      }).then(res => res.json())

    if(response.errorMessage) {
      dispatch({ type: types.LIST_MY_ORDERS_FAIL, payload: response.errorMessage })
    } else {
      dispatch({ type: types.LIST_MY_ORDERS_SUCCESS, payload: response })
    }
  } catch (e) {
    dispatch({ type: types.LIST_MY_ORDERS_FAIL, payload: e.message })
  }
}

export const listOrders = () => async (dispatch, getState) => {
  dispatch({ type: types.ORDER_LIST_REQUEST })
  try {
    const { userLogin: { userInfo: { token }}} = getState()

    const response = await fetch(
      '/api/orders', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        },
      }).then(res => res.json())

    if(response.errorMessage) {
      dispatch({ type: types.ORDER_LIST_FAIL, payload: response.errorMessage })
    } else {
      dispatch({ type: types.ORDER_LIST_SUCCESS, payload: response })
    }
  } catch (e) {
    dispatch({ type: types.ORDER_LIST_FAIL, payload: e.message })
  }
}
