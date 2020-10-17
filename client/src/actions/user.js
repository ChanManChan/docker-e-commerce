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

  if(response.message) {
    dispatch({ type: types.USER_LOGIN_FAIL, payload: response.message })
  } else {
    dispatch({ type: types.USER_LOGIN_SUCCESS, payload: response })
    localStorage.setItem('userInfo', JSON.stringify(response))
  }
}

export const logout = () => {
  localStorage.removeItem('userInfo')
  return { type: types.USER_LOGOUT }
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

  if(response.message) {
    dispatch({ type: types.USER_REGISTER_FAIL, payload: response.message })
  } else {
    dispatch({ type: types.USER_REGISTER_SUCCESS, payload: response })
    dispatch({ type: types.USER_LOGIN_SUCCESS, payload: response })
    localStorage.setItem('userInfo', JSON.stringify(response))
  }
}
