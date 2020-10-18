import * as types from '../types'

const CART_INITIAL_STATE = {
  cartItems: [],
  shippingAddress: {},
  paymentMethod: ''
}

export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  switch(action.type) {
    case types.CART_ADD_ITEM:
      const item = action.payload
      const existingItem = state.cartItems.find(x => x.productId === item.productId)
      if(existingItem)
        return {
          ...state,
          cartItems: state.cartItems.map(x => x.productId === existingItem.productId ? item : x)
        }
      else
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
    case types.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x.productId !== action.payload)
      }
    case types.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload
      }
    case types.CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload
      }
    default:
      return state
  }
}
