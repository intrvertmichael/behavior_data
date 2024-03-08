"use client"

import { useRouter } from "next/navigation"
import { isEmpty } from "lodash"

import { updateStudentHomeroom } from "../utils/dbFunctions"

import DropDown from "./DropDown"

export default function AddStudentToHomeroom({ students, homeroom_id }) {
  const router = useRouter()

  const onChange = async e => {
    if (isEmpty(e.target.value)) return

    await updateStudentHomeroom({
      id: e.target.value,
      homeroom_id: homeroom_id,
    })

    router.refresh()
  }

  if (isEmpty(students)) return <></>

  return (
    <DropDown
      onChange={onChange}
      defaultItem='- Add Student to Class -'
      items={students}
    />
  )
}
