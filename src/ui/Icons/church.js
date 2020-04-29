import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({ size, fill }) => {
  
  return (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 26 24" aria-labelledby="title">
    <path 
      d="M12.7061 14.667C11.3203 14.793 10.3125 16.0527 10.3125 17.4385V22.0156C10.3125 22.3936 10.6064 22.6875 10.9844 22.6875H15.0156C15.3516 22.6875 15.6875 22.3936 15.6875 22.0156V17.3125C15.6875 15.7588 14.3018 14.499 12.7061 14.667ZM24.3379 15.4648L19.7188 13.4912V12.0635C19.7188 11.5596 19.4668 11.1396 19.0469 10.8877L14.0078 7.86426V5.89062H16.5273C16.7793 5.89062 17.0312 5.68066 17.0312 5.38672V4.37891C17.0312 4.12695 16.7793 3.875 16.5273 3.875H14.0078V1.69141C14.0078 1.43945 13.7559 1.1875 13.5039 1.1875H12.4961C12.2021 1.1875 11.9922 1.43945 11.9922 1.69141V3.875H9.47266C9.17871 3.875 8.96875 4.12695 8.96875 4.37891V5.38672C8.96875 5.68066 9.17871 5.89062 9.47266 5.89062H11.9922V7.86426L6.91113 10.8877C6.5332 11.0977 6.28125 11.6436 6.28125 12.0635V13.4912L1.62012 15.4648C1.1582 15.6748 0.90625 16.2207 0.90625 16.8506V21.9736C0.90625 22.3936 1.11621 22.6875 1.45215 22.6875H2.25C2.58594 22.6875 2.92188 22.3936 2.92188 22.0156V17.1445L6.28125 15.6748V22.0156C6.28125 22.3936 6.5752 22.6875 6.95312 22.6875H7.625C7.96094 22.6875 8.29688 22.3936 8.29688 22.0156V12.4414L13 9.58594L17.7031 12.4414V22.0156C17.7031 22.3936 17.9971 22.6875 18.375 22.6875H19.0469C19.3828 22.6875 19.7188 22.3936 19.7188 22.0156V15.6748L23.0781 17.1445V22.0156C23.0781 22.3936 23.3721 22.6875 23.75 22.6875H24.5059C24.8418 22.6875 25.0938 22.3936 25.0938 21.9736V16.8506C25.0938 16.2207 24.7998 15.6748 24.3379 15.4648Z"
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