import React from 'react'
import PropTypes from 'prop-types'

const generateStars = (value, color) => {
  const ratings = []
  for(let i = 1; i <= 5; i++) {
    ratings.push(
      <span key={i}>
        <i
         style={{ color }}
         className={value >= i ? 'fas fa-star' : value >= i - 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'} />
      </span>
    )
  }
  return ratings
}

const Rating = ({ value, text = '', color }) => {
  return (
    <div className="rating">
      {generateStars(value, color)}
      <span>{text}</span>
    </div>
  )
}

Rating.defaultProps = {
  color: '#f8e825'
}

Rating.propTypes = {
  value: PropTypes.number,
  text: PropTypes.string,
  color: PropTypes.string
}

export default Rating
