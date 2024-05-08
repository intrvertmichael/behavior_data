"use client"

import { useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { isEmpty } from "lodash"

import { createParamQuery } from "../utils/general"

import DropDown from "./DropDown"

export default function DatePicker({ value, previousDates }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createParamQueryCallback = useCallback(createParamQuery, [searchParams])

  const onChange = e => {
    const url = isEmpty(e.target.value)
      ? pathname
      : pathname +
        "?" +
        createParamQueryCallback("date", e.target.value, searchParams)

    router.push(url)
  }

  return (
    <DropDown
      value={value}
      onChange={onChange}
      items={previousDates}
      divClassname='p-3'
      defaultItem={{ value: "", name: "- Please Choose -" }}
      fullWidth
      required
    />
  )
}
