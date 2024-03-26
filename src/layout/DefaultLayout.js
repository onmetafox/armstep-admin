import React from 'react'
import {AppContent, AppSidebar, AppFooter, AppHeader} from '../components/index'
import ToastDialog from "../components/ToastDialog";

const DefaultLayout = () => {
  return (
    <div style={{position: "relative"}}>
      <AppSidebar/>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader/>
        <div className="body flex-grow-1 px-1">
          <AppContent/>
        </div>
        <AppFooter/>
      </div>
      <ToastDialog/>
    </div>
  )
}

export default DefaultLayout
