import React from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { savePaymentMethod } from '../actions'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch()
  const { shippingAddress, paymentMethod: paymentMethodFromStorage } = useSelector(state => state.cart)

  React.useEffect(() => {
    if(!shippingAddress)
      history.push('/shipping')
  }, [shippingAddress, history])

  const [selectedOption, setPaymentMethod] = React.useState(paymentMethodFromStorage)

  const handleInputChange = e => {
    setPaymentMethod(e.target.value)
  }

  const submitHandler = e => {
    e.preventDefault()
    dispatch(savePaymentMethod(selectedOption))
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
         <Form.Group>
           <Form.Label as='legend'>Select Payment Method</Form.Label>
           <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              name='paymentMethod'
              value='PayPal'
              checked={selectedOption === 'PayPal'}
              onChange={handleInputChange} />
            <Form.Check
              type='radio'
              label='Stripe'
              name='paymentMethod'
              value='Stripe'
              checked={selectedOption === 'Stripe'}
              onChange={handleInputChange} />
           </Col>
         </Form.Group>
        <Button type='submit' variant='primary'>Continue</Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
