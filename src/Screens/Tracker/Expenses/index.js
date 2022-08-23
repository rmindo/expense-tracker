import React, {Fragment} from 'react'

/**
 * Components
 */
import Panel from '@Components/Panel'
import AddExpenseModal from '@Components/Modal/AddExpense'

/**
 * Models
 */
import expenses from '@Models/Expenses'

/**
 * Images
 */
import Spinner from '@Assets/Images/spinner.gif'

/**
 * Expenses Screen
 */
export default class Expenses extends React.PureComponent {
  /**
   * State
   */
  state = {
    expenses: [],
    fetching: true,
  }


  /**
   * Add expense
   * @param {Object} state
   */
  add = (state) => (e) => {
    if(state.title) {
      var added = expenses.add(state)

      if(added) {
        var items = expenses.items.sort((x, y) => y.id - x.id)
        this.setState({
          add: false,
          fetching: false,
          /**
          * Update list
          */
          expenses: [added, ...items]
        })
      }
    }
    e.preventDefault()
  }


  /**
   * Set expenses
   */
  componentDidMount = () => {
    var items = expenses.items()
    /**
     * Faking the fetch
     */
    setTimeout(() => {
      this.setState({
        fetching: false,
        expenses: items.sort((x, y) => y.id - x.id)
      })
    }, 100)
  }


  /**
   * Render
   */
  render() {
    const state = this.state
    const styles = {
      button: {
        color: '#eda359',
        cursor: 'pointer',
        marginRight: 30,
        fontWeight: 'bold'
      }
    }
    return (
      <Fragment>
        <div id="accounts">
          <Panel/>
          <div id="content">
            <div className="inner">
              <header>
                <div className="left">
                  <h2>Expenses</h2>
                </div>
                <div className="right">
                  <span className="button-1" onClick={() => this.setState({add: true})} style={{padding: '5px 15px', fontSize: 14}}>+ Add Expense</span>
                </div>
              </header>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                {(state.fetching && state.expenses.length == 0) ? (
                  <tbody>
                    <tr>
                      <td colSpan={4} style={{textAlign: 'center'}}>
                        <img src={Spinner} style={{width: 32, padding: 20}}/>
                      </td>
                    </tr>
                  </tbody>
                ):(
                  <tbody>
                    {state.expenses.map((item, key) => (
                      <tr key={key}>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td>${item.amount.toLocaleString()}</td>
                        <td>{item.date}</td>
                        <td>
                          <span
                            onClick={() => {
                              if(expenses.remove(item.id)) {
                                this.setState(({expenses}) => ({expenses: expenses.filter((v,i) => i !== key)}))
                              }
                            }}
                            style={styles.button}>Remove</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>

          <AddExpenseModal
            open={state.add}
            onSubmit={this.add(state).bind(this)}
            close={() => this.setState({add: false})}
            title={(e) => this.setState({title: e.target.value})}
            amount={(e) => this.setState({amount: e.target.value})}
            description={(e) => this.setState({description: e.target.value})}
          />
        </div>
      </Fragment>
    )
  }
}