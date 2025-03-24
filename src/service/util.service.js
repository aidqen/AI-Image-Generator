export function getTimeOfSent(time) {
    if (!time) return ''
    const date = new Date(time)
    const today = new Date()
  
    const options = { month: 'short', day: 'numeric' }
    let hours = date.getHours()
    const minutes = date.getMinutes()
  
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12 // The hour '0' should be '12'
  
    const minutesStr = minutes < 10 ? '0' + minutes : minutes
  
    const isSameDay =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    const isSameYear = date.getFullYear() === today.getFullYear()
  
    if (isSameDay) {
      return hours + ':' + minutesStr + ' ' + ampm
    } else if (!isSameYear) {
      // Format date as dd/mm/yyyy if not from the current year
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      return `${day < 10 ? '0' : ''}${day}/${
        month < 10 ? '0' : ''
      }${month}/${year}`
    } else {
      // Format date as "MMM dd" for dates from the current year but not today
      return date.toLocaleDateString('en-US', options)
    }
  }
  