import React from 'react'
import { Link } from 'react-router-dom';
function PageNotFound() {
  return (
    <div className='text-center my-10'>
      <h1 className='text-4xl font-bold mb-4'>Oops! Page Not Found (404)</h1>
      <p className='mb-4'>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go back to the homepage</Link>
    </div>
  )
}
export default PageNotFound