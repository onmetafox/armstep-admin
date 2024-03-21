import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div/>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="http://80.71.157.13:3000/" target="_blank" rel="noopener noreferrer">
          Armstep
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
