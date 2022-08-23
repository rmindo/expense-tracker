import React from 'react'
import {Link, Outlet} from 'react-router-dom'

/**
 * Images
 */
import Logo from '@Assets/Images/logo-white.png'

/**
 * Export Header
 */
export default () => {

  const menus = [
    {name: 'Dashboard', icon: 'grid'},
    {name: 'Expenses', icon: 'layers'}
  ]

  return (
    <div id="panel">
      <div className="logo">
        <img src={Logo} width={100}/>
      </div>

      <div className="navigation">
        <ul className="menu">
          {menus.map((item, index) => {
            var active = {}
            var pathname = location.pathname.split('/')[1]

            if(pathname == item.name.replace(/\s/, '-').toLowerCase()) {
              active = {
                backgroundColor: '#0f0d2c'
              }
            }

            return (
              <li key={index} style={active}>
                <Link to={`/${item.name.toLowerCase()}`}>
                  <i className={`icon-${item.icon}`}></i>
                  <span>{item.name}</span>
                </Link>
              </li>
            )
          })}
          <li
            onClick={() => {
              localStorage.removeItem('session')
            }}>
            <Link to={'/'}>
              <i className={`icon-delete`}></i>
              <span>Logout</span>
            </Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </div>
  )
}