import * as types from '../types'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const response = await fetch(`/api/products/${id}`).then(res => res.json())

  dispatch({
    type: types.CART_ADD_ITEM,
    payload: {
      productId: response._id,
      name: response.name,
      image: response.image,
      price: response.price,
      countInStock: response.countInStock,
      qty
    }})

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: types.CART_REMOVE_ITEM, payload: id })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = data => {
  localStorage.setItem('shippingAddress', JSON.stringify(data))
  return { type: types.CART_SAVE_SHIPPING_ADDRESS, payload: data }
}

export const savePaymentMethod = data => {
  localStorage.setItem('paymentMethod', JSON.stringify(data))
  return { type: types.CART_SAVE_PAYMENT_METHOD, payload: data }
}
