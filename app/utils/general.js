export const createMDYDate = date => {
  const dateObj = new Date(date)
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const monthIndex = dateObj.getUTCMonth()
  const day = dateObj.getUTCDate()
  const year = dateObj.getUTCFullYear()

  return `${months[monthIndex]} ${day}, ${year}`
}

export const createISODate = date => {
  const dateObj = new Date(date)
  const month = dateObj.toLocaleString("default", { month: "2-digit" })
  const day = dateObj.getDate()
  const year = dateObj.getFullYear()
  return `${year}-${month}-${day}`
}

export const createISODateFromUTC = date => {
  const dateObj = new Date(date)
  const year = dateObj.getUTCFullYear()
  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0")
  const day = dateObj.getUTCDate().toString().padStart(2, "0")
  return `${year}-${month}-${day}`
}

export const createParamQuery = (name, value, searchParams) => {
  const params = new URLSearchParams(searchParams.toString())
  params.set(name, value)
  return params.toString()
}
