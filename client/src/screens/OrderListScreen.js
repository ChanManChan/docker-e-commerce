import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const { orders, loading, error } = useSelector(state => state.orderList)
  const { userInfo } = useSelector(state => state.userLogin)

  React.useEffect(() => {
    if(userInfo && userInfo.isAdmin)
      dispatch(listOrders())
    else
      history.push('/')
  }, [dispatch, history, userInfo])

  return (
    <>
      <h1>Orders</h1>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL PRICE</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>SHIPPING TO</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td style={{ textAlign: 'center' }}>
                  {order.isPaid ? order.paidAt.substring(0, 10) : <i className='fas fa-times' style={{ color: 'red' }} />}
                </td>
                <td style={{ textAlign: 'center' }}>
                  {order.isDelivered ? order.deliveredAt.substring(0, 10) : <i className='fas fa-times' style={{ color: 'red' }} />}
                </td>
                <td>{order.shippingAddress.country}</td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen
