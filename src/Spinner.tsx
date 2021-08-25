import React from 'react'

function Spinner({loading} : {loading:boolean}) {
    
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
