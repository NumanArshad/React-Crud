import React from 'react'
const LoaderSpinner = () => {
  return (
    <div id="overlay" style={{ display: "visible" }}>
      <div class="spinner"></div>
      <br />
      Loading...
    </div>)
}
export default LoaderSpinner
