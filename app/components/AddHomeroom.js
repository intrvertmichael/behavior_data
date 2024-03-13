"use client"

import { useState } from "react"
import { isEmpty } from "lodash"

import {
  addHomeroom,
  getTeachersBySchoolIdWithoutHomeroom,
} from "../utils/dbFunctions"

import DropDown from "./DropDown"
import Button from "./Button"
import { useRouter } from "next/navigation"

export default function AddHomeroom({ schools }) {
  const router = useRouter()

  const [showForm, setShowForm] = useState(false)
  const [teachers, setTeachers] = useState([])
  const [school_id, setSchoolId] = useState(0)
  const [teacher_id, setTeacherId] = useState(0)

  const handleClick = () => setShowForm(curr => !curr)

  const handleSchoolChange = async e => {
    if (isEmpty(e.target.value)) {
      setSchoolId(0)
      setTeachers([])
      return
    }

    setSchoolId(e.target.value)

    const res = await getTeachersBySchoolIdWithoutHomeroom(e.target.value)
    console.log({ res })
    setTeachers(res)
  }

  const handleTeacherChange = e => setTeacherId(e.target.value)

  const handleSubmit = async e => {
    e.preventDefault()
    await addHomeroom({ teacher_id, school_id })

    setSchoolId("")
    setTeacherId("")
    setTeachers([])
    setShowForm(false)

    router.refresh()
  }

  if (showForm) {
    return (
      <div className='flex flex-col items-end p-3 border rounded'>
        <button onClick={handleClick}>x</button>

        <form className='p-3'>
          <label>Add Homeroom to School</label>

          <p className='text-neutral-500'>
            Choose the school that needs the new homeroom and the teacher that
            will be in charge of that homeroom.
          </p>

          <DropDown
            onChange={handleSchoolChange}
            defaultItem='- Choose School -'
            items={schools}
            fullWidth
          />

          {!isEmpty(teachers) && (
            <DropDown
              onChange={handleTeacherChange}
              defaultItem='- Choose Teacher -'
              items={teachers}
              fullWidth
            />
          )}

          <Button
            label='Add Homeroom'
            onClick={handleSubmit}
            className='mt-6'
          />
        </form>
      </div>
    )
  }

  return (
    <button
      className='p-6 border rounded cursor-pointer hover:bg-neutral-900'
      onClick={handleClick}
    >
      Add Homeroom
    </button>
  )
}
