import React, {Fragment} from 'react'

/**
 * Components
 */
import Button from '@Components/Button'

/**
 * Helpers
 */
import {storage} from '@Models/Helpers'

/**
 * Images
 */
import Logo from '@Assets/Images/logo.png'

/**
 * Login Screen
 */
export default class Login extends React.PureComponent {
  /**
   * State
   */
  state = {
    email: '',
    password: '',
  }

  /**
   * No authentication
   * @param {Object} state
   */
  login = (state) => (e) => {
    e.preventDefault()
    
    storage.set('session', true)

    location.href = '/dashboard'
  }


  /**
   * Back to dashboard
   */
  componentDidMount = () => {
    var session = storage.get('session')
    
    if(session) {
      location.href = '/dashboard'
    }
  }

  /**
   * Render
   */
  render() {
    const props = this.props
    const state = this.state
    return (
      <Fragment>
        <div id="login" className="box">
          <header id="header">
            <img src={Logo} id="logo" alt="logo" />
          </header>
          <form id="form" onSubmit={this.login(state, props).bind(this)}>
              {state.error && (
                <p className="error">{state.error}</p>
              )}
              {/**
               * Fields 
               */}
              <div className="field">
                <label>Email Address</label>
                <input type="email" onChange={(e) => this.setState({email: e.target.value})} placeholder="Email Address" required/>
              </div>
              <div className="field" style={{marginBottom: 10}}>
                <label>Password</label>
                <input type="password" onChange={(e) => this.setState({password: e.target.value})} placeholder="Password" required/>
              </div>
              <div className="action">
                <Button label={'Login'} className={'button-2'} style={{width: '100%', alignSelf: 'center'}}/>
              </div>
            </form>
        </div>
      </Fragment>
    )
  }
}