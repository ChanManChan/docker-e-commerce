import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions'
import FormContainer from '../components/FormContainer'

const RegisterScreen = ({ location, history }) => {
  const dispatch = useDispatch()
  const [{
    name,
    email,
    password,
    confirmPassword,
    message
  },
  setFields] = React.useState({ name: '', email: '', password: '', confirmPassword: '', message: null })

  const { loading, error, userInfo } = useSelector(state => state.userRegister)
  //! URL query string
  const redirect = location.search ? location.search.split('=')[1] : '/'

  React.useEffect(() => {
    if(userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const handleInputChange = e => {
    e.persist()
    setFields(cs => ({ ...cs, [e.target.name]: e.target.value }))
  }

  const submitHandler = e => {
    e.preventDefault()
    if(password !== confirmPassword)
      setFields(cs => ({ ...cs, message: 'Passwords do not match' }))
    dispatch(register(name, email, password))
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {message && <Message variant='danger'>{message}</Message>}
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
          Register
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>Have an Account ? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link></Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
