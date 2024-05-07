export const createFullDateMDY = date => {
  const dateObj = new Date(date)
  const month = dateObj.toLocaleString("default", { month: "long" })
  const day = dateObj.getDate()
  const year = dateObj.getFullYear()
  return `${month} ${day}, ${year}`
}

export const createFullDateISO = date => {
  const dateObj = new Date(date)
  const month = dateObj.toLocaleString("default", { month: "2-digit" })
  const day = dateObj.getDate()
  const year = dateObj.getFullYear()
  return `${year}-${month}-${day}`
}
