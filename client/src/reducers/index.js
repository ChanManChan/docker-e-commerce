import { combineReducers } from 'redux'

import { productListReducer, productDetailsReducer } from './product'
import { cartReducer } from './cart'
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './user'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, listMyOrdersReducer } from './order'

export default combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  listMyOrders: listMyOrdersReducer
})
