import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Rating from '../components/Rating'
import { fetchProductDetails, createProductReview } from '../actions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../types'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'

const ProductScreen = ({ match, history }) => {
  const productId = match.params.id
  const [qty, setQty] = React.useState(1)
  const [{ rating, comment }, setFields] = React.useState({ rating: 0, comment: '' })

  const dispatch = useDispatch()

  const { loading, error, product } = useSelector(state => state.productDetails)
  const { error: errorReview, success: successReview } = useSelector(state => state.productReviewCreate)
  const { userInfo } = useSelector(state => state.userLogin)

  React.useEffect(() => {
    if(successReview) {
      alert('Review Submitted')
      setFields({ rating: 0, comment: '' })
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(fetchProductDetails(productId))
  }, [productId, dispatch, successReview])

  const addToCartHandler = () => {
    history.push(`/cart/${productId}?qty=${qty}`)
  }

  const submitHandler = e => {
    e.preventDefault()
    dispatch(createProductReview(productId, { rating, comment }))
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">Go Back</Link>
      {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
        <>
          <Meta title={product.name} />
          <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item><h2>{product.name}</h2></ListGroup.Item>
                  <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                  </ListGroup.Item>
                  <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                  <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col><strong>${product.price}</strong></Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control as='select' value={qty} onChange={e => setQty(e.target.value)}>
                              {[...Array(product.countInStock).keys()].map(x => (
                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                              ))}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                      <Button
                        className="btn-block"
                        type="button"
                        onClick={addToCartHandler}
                        disabled={product.countInStock === 0}>
                        Add To Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
          </Row>
        </>
      )}
      <Row>
        <Col md={6}>
          <h2>Reviews</h2>
          {product.reviews.length === 0 && <Message>No Reviews</Message>}
          <ListGroup variant='flush'>
              {product.reviews.map(review => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <h2>Write a Customer Review</h2>
                {errorReview && <Message variant='danger'>{errorReview}</Message>}
                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId='rating'>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control as='select' value={rating} onChange={e => {
                        e.persist()
                        setFields(cs => ({ ...cs, rating: e.target.value }))
                      }}>
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='comment'>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control as='textarea' row='3' value={comment} onChange={e => {
                        e.persist()
                        setFields(cs => ({ ...cs, comment: e.target.value }))
                      }} />
                    </Form.Group>
                    <Button type='submit' variant='primary'>Submit</Button>
                  </Form>
                ) : (
                  <Message><Link to='/login'>Login</Link> to write a review</Message>
                )}
              </ListGroup.Item>
            </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
