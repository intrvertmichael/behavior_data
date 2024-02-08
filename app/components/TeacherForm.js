"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { addTeacher, updateTeacher } from "../utils/dbFunctions"

import Button from "./Button"
import DropDown from "./DropDown"
import Input from "./Input"

export default function TeacherForm({
  updateItem,
  setUpdateItem,
  schools,
  setShowAddForm,
}) {
  const router = useRouter()

  const [name, setName] = useState(updateItem?.name || "")
  const [subject, setSubject] = useState(updateItem?.subject || "")
  const [school_id, setSchoolId] = useState(updateItem?.school_id || "")

  useEffect(() => {
    setName(updateItem?.name || "")
    setSubject(updateItem?.subject || "")
    setSchoolId(updateItem?.school_id || "")
  }, [updateItem])

  const closeWindow = () => {
    if (setUpdateItem) setUpdateItem()
    if (setShowAddForm) setShowAddForm(false)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (updateItem) {
      await updateTeacher({ id: updateItem.id, name, subject, school_id })
    } else {
      await addTeacher({ name, subject, school_id })
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

      <form className='grid gap-3' onSubmit={handleSubmit}>
        <Input
          label={`${updateLabel}Name`}
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <Input
          label={`${updateLabel}Subject`}
          type='text'
          value={subject}
          onChange={e => setSubject(e.target.value)}
          required
        />

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
