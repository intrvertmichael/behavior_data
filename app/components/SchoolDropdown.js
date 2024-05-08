"use client"

import { useRouter, useParams } from "next/navigation"

import DropDown from "./DropDown"

export default function SchoolDropDown({ items }) {
  const router = useRouter()
  const params = useParams()

  const handleSelectChange = e => router.replace(`/${e.target.value}`)

  return (
    <DropDown
      label='School'
      value={params.school || ""}
      onChange={handleSelectChange}
      defaultItem={{ value: "", name: "- Please choose a School -" }}
      items={items}
    />
  )
}
