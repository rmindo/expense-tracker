/**
 * Text helper
 */
export const text = {
  /**
   * Cut the length of the text
   * @param {string} text 
   * @param {number} length 
   * @returns {string}
   */
  ellipsis: (text, length = 10) => {
    return text.split(/\s/).slice(0, length).join(' ')
  }
}

/**
 * Storage
 */
export const storage = {
  /**
   * Get data from browser's local storage
   * @param {string} key 
   * @returns {mixed}
   */
  get: (key) => {
    return localStorage.getItem(key)
  },

  /**
   * Set value to local storage
   * @param {string} key 
   * @param {mixed} value 
   * @returns {void}
   */
  set: (key, value) => {
    localStorage.setItem(key, value)
  },

  /**
   * Add value to existing array
   * @param {string} key 
   * @param {mixed} value 
   * @returns {void}
   */
  add: (key, value) => {
    try {
      /**
       * If there's existing array value
       * then add it to the list
       */
      var data = JSON.parse(localStorage.getItem(key))
      
      value.id = (data?.length ?? 0)+1
      if(data) {
        if(Array.isArray(data)) {
          localStorage.setItem(key, JSON.stringify([...data, value]))
        }
      }
      else {
        localStorage.setItem(key, JSON.stringify([value]))
      }
    }
    catch(e) {
      console.error(e)
    }
  },

  /**
   * Remove existing value
   * @param {string} key 
   * @returns {void}
   */
  remove: (key) => {
    localStorage.removeItem(key)
  }
}


/**
 * Time and date helper
 */
 export const datetime = {
  months: [
    ['01', 'Jan', 'January'],
    ['02', 'Feb', 'February'],
    ['03', 'Mar', 'March'],
    ['04', 'Apr', 'April'],
    ['05', 'May', 'May'],
    ['06', 'Jun', 'June'],
    ['07', 'Jul', 'July'],
    ['08', 'Aug', 'August'],
    ['09', 'Sep', 'September'],
    ['10', 'Oct', 'October'],
    ['11', 'Nov', 'November'],
    ['12', 'Dec', 'December'],
  ],
  
  /**
   * Date today
   */
  today() {
    var date = new Date()
    if(!date.month) {
      date.month = this.months[date.getMonth()]
    }
    return date
  },
  /**
   * Set date
   */
  date(date) {
    return new Date(date)
  },
  /**
   * Convert unix timestamp to human readable text
   */
  toDate(ts = null) {
    var date = new Date()
    if(ts) {
      date = this.date(ts)
    }
    /**
     * Prepend 0 if the month is signle number
     */
    var month = (date.getMonth()+1).toString()
    if(month.length == 1) {
      month = `0${month}`
    }
    
    var array = [date.getFullYear(), month, date.getDate()]
    if(ts) {
      return array.join('-')
    }
    return array.map(i => i.toString())
  }
 }