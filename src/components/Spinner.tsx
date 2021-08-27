import React from 'react'

interface PropTypes  {
  loading: boolean
}
function Spinner({loading} : PropTypes) {
    
    return (
      <>
       { loading && 
        <div className="my-5 d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
       }
       </>
    )
    
}

export default Spinner
