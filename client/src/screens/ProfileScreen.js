import React from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile, listMyOrders } from '../actions'

const ProfileScreen = ({ location, history }) => {
  const dispatch = useDispatch()
  const [{
    name,
    email,
    password,
    confirmPassword,
    message
  },
  setFields] = React.useState({ name: '', email: '', password: '', confirmPassword: '', message: null })

  const { loading, error, user } = useSelector(state => state.userDetails)
  const { userInfo } = useSelector(state => state.userLogin)
  const { success } = useSelector(state => state.userUpdateProfile)
  const { loading: fetchOrdersLoading, error: fetchOrdersError, orders } = useSelector(state => state.listMyOrders)

  React.useEffect(() => {
    if(!userInfo)
      history.push('/login')
    else if(!user.name) {
      dispatch(getUserDetails('profile'))
      dispatch(listMyOrders())
    }
    else
      setFields(cs => ({ ...cs, name: user.name, email: user.email }))
  }, [dispatch, history, userInfo, user])

  const handleInputChange = e => {
    e.persist()
    setFields(cs => ({ ...cs, [e.target.name]: e.target.value }))
  }

  const submitHandler = e => {
    e.preventDefault()
    if(password !== confirmPassword)
      setFields(cs => ({ ...cs, message: 'Passwords do not match' }))
    dispatch(updateUserProfile({ name, email, password }))
  }

  return (
    <Row>
      <Col md={3}>
        <h2>Edit Profile</h2>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        {message && <Message variant='danger'>{message}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' placeholder='Enter name' value={name} name='name' onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' value={email} name='email' onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Enter password' value={password} name='password' onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} name='confirmPassword' onChange={handleInputChange} />
          </Form.Group>
          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {fetchOrdersLoading ? <Loader /> : fetchOrdersError ? <Message variant='danger'>{fetchOrdersError}</Message> : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : <i className='fas fa-times' style={{ color: 'red' }} />}</td>
                  <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : <i className='fas fa-times' style={{ color: 'red' }} />}</td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='light' className='btn-sm'>Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
