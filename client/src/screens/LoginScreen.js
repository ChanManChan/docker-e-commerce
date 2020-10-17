import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions'
import FormContainer from '../components/FormContainer'

const LoginScreen = ({ location, history }) => {
  const dispatch = useDispatch()
  const [{ email, password }, setFields] = React.useState({ email: '', password: '' })
  const { loading, error, userInfo } = useSelector(state => state.userLogin)
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
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' value={email} name='email' onChange={handleInputChange} />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Enter password' value={password} name='password' onChange={handleInputChange} />
        </Form.Group>
        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>New Customer ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link></Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
