import React from 'react'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PayPalButton } from 'react-paypal-button-v2'

import { getOrderDetails, payOrder } from '../actions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import * as types from '../types'

const OrderScreen = ({ match }) => {
  const dispatch = useDispatch()
  const orderId = match.params.id
  const [sdkReady, setSdkReady] = React.useState(false)

  const {
    order: {
    shippingAddress: { address, city, postalCode, country } = {},
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    isDelivered,
    _id,
    orderItems,
    paymentMethod,
    user,
    paidAt,
    deliveredAt
  }, loading, error } = useSelector(state => state.orderDetails)

  const { success: successPay, loading: loadingPay } = useSelector(state => state.orderPay)

  React.useEffect(() => {
    const addPayPalScript = async () => {
      const clientId = await fetch('/api/config/paypal', { method: 'GET' }).then(res => res.text())
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if(!_id || successPay) {
      dispatch(getOrderDetails(orderId))
      dispatch({ type: types.ORDER_PAY_RESET })
    } else if(!isPaid || !window.paypal) {
      addPayPalScript()
    }
  }, [dispatch, orderId, _id, successPay])

  const successPaymentHandler = paymentResult => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
    <>
      <h1>Order {_id}</h1>
      <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Shipping</h2>
                <Row>
                  <Col><strong>Name: </strong>{user.name}</Col>
                  <Col><strong>Email: </strong><a href={`mailto:${user.email}`}>{user.email}</a></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <p><strong>Address: </strong>{`${address}, ${city}, ${postalCode}, ${country}`}</p>
                {isDelivered ? <Message variant='success'>Delivered on {deliveredAt}</Message> : <Message variant='warning'>Not Delivered</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p><strong>Method: </strong>{paymentMethod}</p>
                {isPaid ? <Message variant='success'>Paid on {paidAt}</Message> : <Message variant='warning'>Not Paid</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Items</h2>
                {orderItems.length === 0 ? <Message>Order is empty</Message> : (
                  <ListGroup variant='flush'>
                    {orderItems.map(item => (
                      <ListGroup.Item key={item.productId}>
                        <Row>
                          <Col md={1}><Image src={item.image} alt={item.name} fluid rounded /></Col>
                          <Col><Link to={`/product/${item.productId}`}>{item.name}</Link></Col>
                          <Col md={4}>{item.qty} X ${item.price} = ${item.price*item.qty}</Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                {!isPaid && (
                  <ListGroup.Item>
                    {loadingPay || !sdkReady ? <Loader /> : (
                      <PayPalButton amount={totalPrice} onSuccess={successPaymentHandler} />
                    )}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
        </>
     )
}

export default OrderScreen
