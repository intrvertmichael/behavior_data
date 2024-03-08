"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { isEmpty } from "lodash"

import { updateStudentHomeroom } from "../utils/dbFunctions"

import DropDown from "./DropDown"

export default function AddStudentToHomeroom({ students, homeroom_id }) {
  const router = useRouter()

  const [selectedStudent, setSelectedStudent] = useState()

  const onChange = async e => {
    setSelectedStudent(e.target.value)
    await updateStudentHomeroom({
      id: e.target.value,
      homeroom_id: homeroom_id,
    })

    router.refresh()
  }

  if (isEmpty(students)) return <></>

  return (
    <DropDown
      value={selectedStudent}
      onChange={onChange}
      defaultItem='- Add Student to Class -'
      items={students}
    />
  )
}
