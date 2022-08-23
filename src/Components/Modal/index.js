import React from 'react'

/**
 * Images
 */
import closeIcon from '@Assets/Images/close.png'


/**
 * Export Header
 */
export default ({open, title, close, style, children}) => (
  <>
    {open && (
      <div className="pop">
        <div className="sub" style={style}>
          <h3 style={{margin: '0 0 30px'}}>{title}</h3>
          {children}
          <span className="close" onClick={close}>
            <img src={closeIcon} width={16}/>
          </span>
        </div>
      </div>
    )}
  </>
)