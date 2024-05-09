"use client"

import { useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { isEmpty } from "lodash"

import {
  createISODate,
  createMDYDate,
  createParamQuery,
} from "../utils/general"

import DropDown from "./DropDown"

export default function DatePicker({ value, previousDates }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const todayISODate = createISODate()

  const createParamQueryCallback = useCallback(createParamQuery, [searchParams])

  const onChange = e => {
    router.push(
      isEmpty(e.target.value)
        ? pathname
        : pathname +
            "?" +
            createParamQueryCallback("date", e.target.value, searchParams),
    )
  }

  return (
    <DropDown
      value={value}
      onChange={onChange}
      items={previousDates.sort((a, b) => new Date(b.id) - new Date(a.id))}
      defaultItem={{ id: "", name: createMDYDate(todayISODate) }}
      required
    />
  )
}
