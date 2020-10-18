import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const steps = (props, routes) => {
  let stepsArray = []
  for(let i = 0; i < routes.length; i++) {
    stepsArray.push(
      <Nav.Item key={routes[i].label}>
        {props[`step${i+1}`] ? (
          <LinkContainer to={routes[i].route}>
            <Nav.Link>{routes[i].label}</Nav.Link>
          </LinkContainer>
        ): (
          <Nav.Link disabled>{routes[i].label}</Nav.Link>
        )}
      </Nav.Item>
    )
  }
  return stepsArray
}

const CheckoutSteps = (props) => {

  const routes = [
    { route: '/login', label: 'Sign In' },
    { route: '/shipping', label: 'Shipping' },
    { route: '/payment', label: 'Payment' },
    { route: '/placeorder', label: 'Place Order' }
  ]

  return (
    <Nav className='justify-content-center mb-4'>
      {steps(props, routes)}
    </Nav>
  )
}

export default CheckoutSteps
