import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions'

const ProductCarousel = () => {
  const dispatch = useDispatch()
  const { products, error, loading } = useSelector(state => state.productTopRated)

  React.useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
    <Carousel pauseOnHover className='bg-dark'>
      {products.map(product => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Row>
              <Col><Image src={product.image} alt={product.name} fluid /></Col>
              <Col>
                <Carousel.Caption className='carousel-caption'>
                  <h2>{product.name} (${product.price})</h2>
                </Carousel.Caption>
              </Col>
            </Row>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
