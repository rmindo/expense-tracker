import React from 'react'

/**
 * Components
 */
import Modal from '@Components/Modal'
import Button from '@Components/Button'


/**
 * Export Header
 */
export default ({open, close, title, amount, description, onSubmit}) => {
  return (
    <Modal open={open} title={'Add Expense'} close={close}>
      <form id="form" onSubmit={onSubmit}>
        <div
          className="field"
          style={{
            marginBottom: 15
          }}>
          <label>Title</label>
          <input type="text" onChange={title} required/>
        </div>
        <div
          className="field"
          style={{
            marginBottom: 15
          }}>
          <label>Amount</label>
          <input type="number" onChange={amount} required/>
        </div>
        <div
          className="field"
          style={{
            marginBottom: 15
          }}>
          <label>Description</label>
          <textarea col="10" row="10" onChange={description}></textarea>
        </div>
        <Button label={'Add'} className={'button-2'} style={{width: '100%'}}/>
      </form>
    </Modal>
  )
}