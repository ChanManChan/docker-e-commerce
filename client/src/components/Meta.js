import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => (
  <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
  </Helmet>
)

Meta.defaultProps = {
  title: 'Welcome To ProShop',
  keywords: 'electronics, buy electronics, cheap chinese gadgets',
  description: 'We sell best products for cheap $'
}


export default Meta
