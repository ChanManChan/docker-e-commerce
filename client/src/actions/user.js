import * as types from '../types'

export const login = (email, password) => async dispatch => {
  dispatch({ type: types.USER_LOGIN_REQUEST })

  const response = await fetch(
    '/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())

  if(response.errorMessage) {
    dispatch({ type: types.USER_LOGIN_FAIL, payload: response.errorMessage })
  } else {
    dispatch({ type: types.USER_LOGIN_SUCCESS, payload: response })
    localStorage.setItem('userInfo', JSON.stringify(response))
  }
}

export const logout = () => dispatch => {
  localStorage.removeItem('userInfo')
  dispatch({ type: types.USER_LOGOUT })
  dispatch({ type: types.USER_DETAILS_RESET })
  dispatch({ type: types.LIST_MY_ORDERS_RESET })
  dispatch({ type: types.USER_LIST_RESET })
}

export const register = (name, email, password) => async dispatch => {
  dispatch({ type: types.USER_REGISTER_REQUEST })

  const response = await fetch(
    '/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
    .then(res => res.json())

  if(response.errorMessage) {
    dispatch({ type: types.USER_REGISTER_FAIL, payload: response.errorMessage })
  } else {
    dispatch({ type: types.USER_REGISTER_SUCCESS, payload: response })
    dispatch({ type: types.USER_LOGIN_SUCCESS, payload: response })
    localStorage.setItem('userInfo', JSON.stringify(response))
  }
}


export const getUserDetails = (queryString) => async (dispatch, getState) => {
  dispatch({ type: types.USER_DETAILS_REQUEST })
  try {
    const { userLogin: { userInfo: { token }}} = getState()

    const response = await fetch(
      `/api/users/${queryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => res.json())

    if(response.errorMessage) {
      dispatch({ type: types.USER_DETAILS_FAIL, payload: response.errorMessage })
    } else {
      dispatch({ type: types.USER_DETAILS_SUCCESS, payload: response })
    }
  } catch (e) {
      dispatch({ type: types.USER_DETAILS_FAIL, payload: e.message })
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: types.USER_UPDATE_PROFILE_REQUEST })
  try {
    const { userLogin: { userInfo: { token }}} = getState()

    const response = await fetch(
      '/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
      })
      .then(res => res.json())

    if(response.errorMessage) {
      dispatch({ type: types.USER_UPDATE_PROFILE_FAIL, payload: response.errorMessage })
    } else {
      dispatch({ type: types.USER_UPDATE_PROFILE_SUCCESS, payload: response })
      localStorage.setItem('userInfo', JSON.stringify(response))
    }
  } catch (e) {
    dispatch({ type: types.USER_UPDATE_PROFILE_FAIL, payload: e.message })
  }
}

export const listUsers = () => async (dispatch, getState) => {
  dispatch({ type: types.USER_LIST_REQUEST })

  try {
    const { userLogin: { userInfo: { token }}} = getState()

    const response = await fetch(
      '/api/users', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
         }
      })
      .then(res => res.json())

    if(response.errorMessage) {
      dispatch({ type: types.USER_LIST_FAIL, payload: response.errorMessage })
    } else {
      dispatch({ type: types.USER_LIST_SUCCESS, payload: response })
    }
  } catch (e) {
    dispatch({ type: types.USER_LIST_FAIL, payload: e.message })
  }
}

export const deleteUser = userId => async (dispatch, getState) => {
  dispatch({ type: types.USER_DELETE_REQUEST })

  try {
    const { userLogin: { userInfo: { token }}} = getState()

    const response = await fetch(
      `/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => res.json())

    if(response.errorMessage) {
      dispatch({ type: types.USER_DELETE_FAIL, payload: response.errorMessage })
    } else {
      dispatch({ type: types.USER_DELETE_SUCCESS })
    }
  } catch (e) {
    dispatch({ type: types.USER_DELETE_FAIL, payload: e.message })
  }
}

export const userById = userId => async (dispatch, getState) => {
  dispatch({ type: types.USER_BY_ID_REQUEST })
  try {
    const { userLogin: { userInfo: { token }}} = getState()

    const response = await fetch(
      `/api/users/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => res.json())

    if(response.errorMessage) {
      dispatch({ type: types.USER_BY_ID_FAIL, payload: response.errorMessage })
    } else {
      dispatch({ type: types.USER_BY_ID_SUCCESS, payload: response })
    }
  } catch (e) {
    dispatch({ type: types.USER_BY_ID_FAIL, payload: e.message })
  }
}

export const updateUser = user => async (dispatch, getState) => {
  dispatch({ type: types.USER_UPDATE_REQUEST })
  try {
    const { userLogin: { userInfo: { token }}} = getState()

    const response = await fetch(
      `/api/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
      }).then(res => res.json())

    if(response.errorMessage) {
      dispatch({ type: types.USER_UPDATE_FAIL, payload: response.errorMessage })
    } else {
      dispatch({ type: types.USER_UPDATE_SUCCESS })
      dispatch({ type: types.USER_BY_ID_SUCCESS, payload: response })
      dispatch({ type: types.USER_DETAILS_SUCCESS, payload: response })
    }
  } catch (e) {
    dispatch({ type: types.USER_UPDATE_FAIL, payload: e.message })
  }
}
