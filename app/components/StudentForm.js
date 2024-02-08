"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { addStudent, updateStudent } from "../utils/dbFunctions"

import Button from "./Button"
import DropDown from "./DropDown"
import Input from "./Input"

export default function StudentForm({
  updateItem,
  setUpdateItem,
  schools,
  setShowAddForm,
}) {
  const router = useRouter()

  const [name, setName] = useState(updateItem?.name || "")
  const [age, setAge] = useState(updateItem?.age || 0)
  const [grade, setGrade] = useState(updateItem?.grade || 0)
  const [school_id, setSchoolId] = useState(updateItem?.school_id || "")

  useEffect(() => {
    setName(updateItem?.name || "")
    setAge(updateItem?.age || 0)
    setGrade(updateItem?.grade || 0)
    setSchoolId(updateItem?.school_id || "")
  }, [updateItem])

  const closeWindow = () => {
    if (setUpdateItem) setUpdateItem()
    if (setShowAddForm) setShowAddForm(false)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (updateItem) {
      await updateStudent({ id: updateItem.id, name, age, grade, school_id })
    } else {
      await addStudent({ name, age, grade, school_id })
    }

    closeWindow()
    router.refresh()
  }

  const updateLabel = updateItem ? "Update " : ""

  return (
    <div className='relative'>
      <button onClick={closeWindow} className='absolute top-0 right-0'>
        X
      </button>

      <form className='grid gap-3 p-6' onSubmit={handleSubmit}>
        <Input
          label={`${updateLabel}Name`}
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <div className='grid grid-cols-2 gap-3'>
          <Input
            label={`${updateLabel}Age`}
            type='number'
            value={age}
            onChange={e => setAge(e.target.value)}
            required
          />

          <Input
            label={`${updateLabel}Grade`}
            type='number'
            value={grade}
            onChange={e => setGrade(e.target.value)}
            required
          />
        </div>

        <DropDown
          label={`${updateLabel}School`}
          value={school_id}
          onChange={e => setSchoolId(e.target.value)}
          defaultItem='- Please choose a School -'
          items={schools}
        />

        <Button label={updateItem ? "Update" : "Add"} />
      </form>
    </div>
  )
}
