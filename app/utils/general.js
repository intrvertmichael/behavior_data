import { isEmpty } from "lodash"

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
  const dateObj = date ? new Date(date) : new Date()
  const year = dateObj.getUTCFullYear()
  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0")
  const day = dateObj.getUTCDate().toString().padStart(2, "0")
  return `${year}-${month}-${day}`
}

export const createParamQuery = (name, value, searchParams = "") => {
  const params = new URLSearchParams(searchParams.toString())
  params.set(name, value)
  return `?${params.toString()}`
}

export const removeParamQuery = (name, searchParams = "") => {
  const params = new URLSearchParams(searchParams.toString())

  if (!isEmpty(params.get(name))) {
    params.delete(name)
  }

  return `?${params.toString()}`
}
