import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({ size, fill }) => {
  
  return (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" aria-labelledby="title">
    <path 
      d="M12 1.52344C6.24707 1.52344 1.58594 6.22656 1.58594 11.9375C1.58594 17.6904 6.24707 22.3516 12 22.3516C17.7109 22.3516 22.4141 17.6904 22.4141 11.9375C22.4141 6.22656 17.7109 1.52344 12 1.52344ZM12 20.3359C7.33887 20.3359 3.60156 16.5986 3.60156 11.9375C3.60156 7.31836 7.33887 3.53906 12 3.53906C16.6191 3.53906 20.3984 7.31836 20.3984 11.9375C20.3984 16.5986 16.6191 20.3359 12 20.3359ZM13.7637 15.9688C13.7637 15.0029 12.9658 14.2051 12 14.2051C10.9922 14.2051 10.2363 15.0029 10.2363 15.9688C10.2363 16.9766 10.9922 17.7324 12 17.7324C12.9658 17.7324 13.7637 16.9766 13.7637 15.9688ZM10.3203 7.1084L10.6143 12.8193C10.6143 13.0713 10.8662 13.2812 11.1182 13.2812H12.8398C13.0918 13.2812 13.3438 13.0713 13.3438 12.8193L13.6377 7.1084C13.6377 6.81445 13.4277 6.5625 13.1338 6.5625H10.8242C10.5303 6.5625 10.3203 6.81445 10.3203 7.1084Z"
      fill={fill}
    />
  </svg>
)}

export default Icon

Icon.propTypes = { 
  size: PropTypes.number,
  fill: PropTypes.string,
};

Icon.defaultProps = {
  size: 32,
}