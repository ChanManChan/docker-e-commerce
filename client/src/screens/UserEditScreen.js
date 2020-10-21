import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { userById, updateUser } from '../actions'
import FormContainer from '../components/FormContainer'
import * as types from '../types'

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id
  const dispatch = useDispatch()

  const [{ name, email, isAdmin }, setFields] = React.useState({ name: '', email: '', isAdmin: false })

  const { loading, error, user } = useSelector(state => state.userById)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = useSelector(state => state.userUpdate)

  React.useEffect(() => {
    if(successUpdate) {
      dispatch({ type: types.USER_UPDATE_RESET })
      history.push('/admin/userlist')
    } else {
      if(!user.name || user._id !== userId)
        dispatch(userById(userId))
      else
        setFields({ name: user.name, email: user.email, isAdmin: user.isAdmin })
    }
  }, [dispatch, userId, user, successUpdate, history])

  const handleInputChange = e => {
    e.persist()
    setFields(cs => ({ ...cs, [e.target.name]: e.target.value }))
  }

  const submitHandler = e => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, isAdmin }))
  }

  return (
    <>
    <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>
    <FormContainer>
      <h1>Edit User</h1>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' placeholder='Enter name' value={name} name='name' onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' value={email} name='email' onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId='isAdmin'>
            <Form.Check
              type='checkbox'
              label='Set as admin ?'
              checked={isAdmin}
              onChange={e => {
                e.persist()
                setFields(cs => ({ ...cs, isAdmin: e.target.checked}))
              }} />
          </Form.Group>
          <Button type='submit' variant='primary'>Update</Button>
        </Form>
      )}
    </FormContainer>
    </>
  )
}

export default UserEditScreen
