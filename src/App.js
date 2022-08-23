import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'


/**
 * Screens
 */
import Screens from '@Screens'

/**
 * Helpers
 */
import {storage} from '@Models/Helpers'
 
/**
 * Global Styles
 */
import '@Assets/Styles/Global.scss'
import '@Assets/Styles/Common.scss'


/**
 * Routes
 */
export default () => {

  if(location.pathname !== '/') {
    if(!storage.get('session')) {
      location.href = '/'
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Screens.Login/>}/>
        <Route path="dashboard" element={<Screens.Dashboard/>}/>
        <Route path="expenses" element={<Screens.Expenses/>}/>
      </Routes>
    </BrowserRouter>
  )
}
