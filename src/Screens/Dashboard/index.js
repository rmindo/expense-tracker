import React, {Fragment} from 'react'
import {Area} from '@ant-design/plots'

/**
 * Components
 */
import Panel from '@Components/Panel'
import AddExpenseModal from '@Components/Modal/AddExpense'


/**
 * Models
 */
import {text, datetime} from '@Models/Helpers'
import expenses, {dummy} from '@Models/Expenses'


/**
 * Styles for this page
 */
import '@Assets/Styles/Pages/Dashboard.scss'

/**
 * Dashboard Screen
 */
export default class Dashboard extends React.PureComponent {
  /**
   * State
   */
  state = {
    today: 0,
    month: 0,
    total: 0,
    data: [],
    recent: [],
    expenses: [],
    title: null,
    amount: null,
    description: null
  }

  /**
   * Add expense
   * @param {Object} state
   */
  add = (state) => (e) => {
    var data = expenses.getData()

    if(state.title) {
      var added = expenses.add(state)

      if(added) {
        var {recent, today, total, month} = state
        
        /**
        * Update stats
        */
        this.setState({
          data,
          add: false,
          today: today + added.amount,
          month: month + added.amount,
          total: total + added.amount,
          /**
           * Add to recent
           */
          recent: (() => {
            recent.push(added)
            return recent.slice(-5)
          })(),

          /**
          * Update chart data
          */
          expenses: (() => {
            if(data.length > 0) {
              var item = data[data.length-1]
              /**
               * Sum up all expenses just today
               */
              if(item) {
                if(item.date == datetime.toDate(Date.now())) {
                  data[item.id-1].amount = item.amount + added.amount
                }
                else {
                  data.push(added)
                }
              }
              return data.slice(-10)
            }
            else {
              return [added]
            }
          })()
        })
      }
    }
    e.preventDefault()
  }

  /**
   * Set visualization when mounted
   */
  componentDidMount = () => {
    var today = 0
    var month = 0
    var total = 0


    var data = expenses.getData()
    if(data) {
      data.forEach((item) => {
        /**
         * Today's expenses
         */
        if(item.date == datetime.toDate(Date.now())) {
          today = item.amount
        }
        /**
         * Expenses this month
         */
        if(datetime.today().getMonth() == datetime.date(item.date).getMonth()) {
          month += item.amount
        }
        /**
         * Total expenses
         */
        total += item.amount
      })
    }
      
    this.setState({
      data,
      today,
      total,
      month,
      recent: expenses.items(),
      expenses: data.slice(-10),
    })
  }


  /**
   * Render
   */
  render() {
    var state = this.state
    var length = state.data.length.toString()

    var length = Number(length.substring(0,1))+1
    return (
      <Fragment>
        <div id="dashboard">
          <Panel/>
          <div id="content">
            <header>
              <h2 className="left">Dashboard</h2>
              <div className="right">
                <a href="" className="button-1" onClick={() => localStorage.removeItem('expenses')} style={{marginRight: 20}}>
                  <span>Clear Data</span>
                </a>
                <a href="" className="button-1" onClick={() => dummy.create()}>
                  <span>Generate Data and Test</span>
                </a>
              </div>
            </header>
            <div id="grid">
              <div className="row-1">
                <div className="item">
                  <span className="amount">${state.today.toLocaleString()}</span>
                  <span className="label">Today's Expenses</span>
                </div>
                <div className="item">
                  <span className="amount">${state.month.toLocaleString()}</span>
                  <span className="label">Month of {datetime.today().month[2]}</span>
                </div>
                <div className="item">
                  <span className="amount">${state.total.toLocaleString()}</span>
                  <span className="label">Total Expenses</span>
                </div>
              </div>
              <div className="row-2">
                <div className="item">
                  <div className="head">
                    <h3>Expenses Over Time</h3>
                    <div className="right">
                      <label>No. of days</label>
                      <select
                        onChange={(e) => {
                          this.setState({expenses: state.data.slice(-(e.target.value))})
                        }}>
                        {Array.from({length: `${length}0`}).map((v, i) => {
                          return (
                            <option key={i}>{i+1}0</option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                  <Area
                    data={state.expenses}
                    width={600}
                    height={300}
                    autoFit={false}
                    xField={'date'}
                    yField={'amount'}
                  />
                </div>
                <div className="item">
                  <div className="head">
                    <h3>Recent Spent</h3>
                    <div className="right">
                      <span className="button-1" onClick={() => this.setState({add: true})} style={{padding: '5px 15px', fontSize: 14}}>
                        <i className="icon-file-plus"></i>
                        <span>Add Expense</span>
                      </span>
                    </div>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.recent.slice(-5).sort((x,y) => y.id-x.id).map((item, key) => (
                        <tr key={key}>
                          <td>{item.title}</td>
                          <td>{text.ellipsis(item.description, 3)}</td>
                          <td>${item.amount.toLocaleString()}</td>
                          <td>{item.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
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