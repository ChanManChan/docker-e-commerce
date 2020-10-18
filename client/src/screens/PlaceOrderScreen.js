import React from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { createOrder } from '../actions'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()

  const addDecimals = num => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const {
    shippingAddress: { address, city, postalCode, country },
    paymentMethod,
    cartItems
  } = useSelector(state => state.cart)

  const { order, success, error } = useSelector(state => state.orderCreate)

  React.useEffect(() => {
    if(success)
      history.push(`/order/${order._id}`)
  }, [history, success, order._id])

  // Calculate prices
  const itemsPrice = addDecimals(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
  const shippingPrice = addDecimals(cartItems.reduce((acc, item) => acc + item.qty, 0) * 2)
  const taxPrice = addDecimals(Number((itemsPrice * 0.1).toFixed(2)))
  const totalPrice =  addDecimals(Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice))

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cartItems,
      shippingAddress: {
        address,
        city,
        postalCode,
        country
      },
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice
    }))
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <strong>Address: </strong>
              {`${address}, ${city}, ${postalCode}, ${country}`}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                <ListGroup variant='flush'>
                  {cartItems.map(item => (
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
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={placeOrderHandler}>
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
