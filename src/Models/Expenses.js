import {datetime, storage} from './Helpers'


/**
 * Expenses helper
 */
export default {
  items: () => JSON.parse(storage.get('expenses')) ?? [],
  /**
   * Add expense to local storage
   * @param {obkect} params
   */
  add: ({title, amount, description}) => {
    var date = Date.now()

    if(amount) {
      var item = {
        title,
        description,
        date: datetime.toDate(date),
        amount: Number(amount)
      }
      storage.add('expenses', item)
      
      return item
    }
  },

  /**
   * Get expenses
   * @returns {array}
   */
  get: () => {
    try {
      var data = {}
      var items = JSON.parse(storage.get('expenses')) ?? []

      for(let i in items) {
        var item = items[i]

        if(data[item.date]) {
          data[item.date].amount.push(item.amount)
        }
        else {
          data[item.date] = Object.assign(item, {amount: [item.amount]})
        }
      }
      return data
    }
    catch(e) {}
  },

  /**
   * 
   * @param {number} id 
   * @returns {array}
   */
  remove: (id) => {
    try {
      var data = JSON.parse(storage.get('expenses')) ?? []

      var length = data.length
      if(id) {
        data = data.filter(i => i.id !== id)
      }
      storage.set('expenses', JSON.stringify(data))
      /**
       * Check if successfully removed
       */
      if(length > data.length) {
        return true
      }
    }
    catch(e) {}
  },


  /**
   * Get data and caculated amount
   * @returns {array}
   */
   getData() {
    var data = []
    var items = this.get('expenses')

    for(let i in items) {
      var item = items[i]
      
      if(item.amount.length >= 1) {
        data.push(Object.assign(item, {amount: item.amount.reduce((t, c) => t+c, 0)}))
      }
      else {
        data.push(Object.assign(item, {amount: item.amount[0]}))
      }
    }

    return data
  }
}




/**
 * Generate dummy expenses for every month
 */
 export const dummy = {

  
  create: () => {
    var data = []
    var count = 1
    var today = new Date()

    
    var expense = (id, month) => {
      var date = `2022-${month}-${id}`

      data.push({
        id: data.length+1,
        date,
        title: `Expense ${data.length+1}`,
        amount: Math.floor(Math.random()*5000),
        description: `Expense from ${date}`
      })
    }
    
    
    while(count <= (today.getMonth()+1)) {
      var month = count.toString()
    
      if(month.toString().length == 1) {
        month = `0${month}`
      }
    
      if(count < 4) {
        Array.from({length: 30}, (v,i) => expense(i+1, month))
      }
      else {
        Array.from({length: today.getDate()}, (v,i) => expense(i+1, month))
      }
      count++
    }

    localStorage.setItem('expenses', JSON.stringify(data))
  }
}
