import React from 'react'

/**
 * Images
 */
import Spinner from '@Assets/Images/spinner-white.gif'


/**
 * Button
 */
export default (props) => (
  <button
    style={props.style}
    onClick={props.click}
    className={props.className}>
    {props.submit ? (
      <img src={Spinner} width={24} style={{lineHeight: 0}}/>
    ):(
      <span style={{fontSize: 18, lineHeight: 1.5}}>{props.label}</span>
    )}
  </button>
)