import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { fetchProductDetails, updateProduct } from '../actions'
import FormContainer from '../components/FormContainer'
import * as types from '../types'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id
  const dispatch = useDispatch()

  const [{
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    description,
    uploading
  }, setFields] = React.useState({
    name: '',
    price: 0,
    image: '',
    brand: '',
    category: '',
    countInStock: 0,
    description: '',
    uploading: false
  })

  const { loading, error, product } = useSelector(state => state.productDetails)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = useSelector(state => state.productUpdate)

  React.useEffect(() => {
    if(successUpdate) {
      dispatch({ type: types.PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      if(!product.name || product._id !== productId)
        dispatch(fetchProductDetails(productId))
      else
        setFields({
          name: product.name,
          price: product.price,
          image: product.image,
          brand: product.brand,
          category: product.category,
          countInStock: product.countInStock,
          description: product.description
         })
    }
  }, [dispatch, productId, product, history, successUpdate])

  const handleInputChange = e => {
    e.persist()
    setFields(cs => ({ ...cs, [e.target.name]: e.target.value }))
  }

  const submitHandler = e => {
    e.preventDefault()
    dispatch(updateProduct({ _id: productId, name, price, image, brand, category, countInStock, description }))
  }

  const uploadFileHandler = async e => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setFields(cs => ({ ...cs, uploading: true }))
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      }).then(res => res.text())

      setFields(cs => ({ ...cs, image: response, uploading: false }))
    } catch (e) {
      console.log(e)
      setFields(cs => ({ ...cs, uploading: false }))
    }
  }

  return (
    <>
    <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
    <FormContainer>
      <h1>Edit Product</h1>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' placeholder='Enter name' value={name} name='name' onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control type='number' placeholder='Enter Price' value={price} name='price' onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId='image'>
            <Form.Label>Image</Form.Label>
            <Form.Control type='text' placeholder='Enter Image Path' value={image} name='image' onChange={handleInputChange} />
            <Form.File id='image-file' label='Choose File' custom onChange={uploadFileHandler}></Form.File>
            {uploading && <Loader />}
          </Form.Group>
          <Form.Group controlId='brand'>
            <Form.Label>Brand</Form.Label>
            <Form.Control type='text' placeholder='Enter Brand' value={brand} name='brand' onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control type='text' placeholder='Enter Category' value={category} name='category' onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId='countInStock'>
            <Form.Label>Stock</Form.Label>
            <Form.Control type='number' placeholder='Enter Current Stock' value={countInStock} name='countInStock' onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control type='text' placeholder='Enter Description' value={description} name='description' onChange={handleInputChange} />
          </Form.Group>
          <Button type='submit' variant='primary'>Update</Button>
        </Form>
      )}
    </FormContainer>
    </>
  )
}

export default ProductEditScreen
