import React from 'react'
import { Form, Button } from 'react-bootstrap'

// Since the searchbox is embedded in the header, we are not going to have direct access to props.history, we have to use something called render props
const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = React.useState('')

  const submitHandler = e => {
    e.preventDefault()
    if(keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
       type='text'
       name='q'
       onChange={e => setKeyword(e.target.value)}
       placeholder='Search Products...'
       className='mr-sm-2 ml-sm-5' />
      <Button type='submit' variant='outline-success' className='p-2'>Search</Button>
    </Form>
  )
}

export default SearchBox
