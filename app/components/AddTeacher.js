import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { addTeacher, updateTeacher } from "../utils/dbFunctions"

import TeacherForm from "./TeacherForm"
import FormWrapper from "./FormWrapper"

export default function AddTeacher({
  updateItem,
  setUpdateItem,
  setShowAddForm,
  schools,
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

  return (
    <FormWrapper
      closeWindow={closeWindow}
      handleSubmit={handleSubmit}
      updateItem={updateItem}
    >
      <TeacherForm
        updateItem={updateItem}
        setUpdateItem={setUpdateItem}
        schools={schools}
        setShowAddForm={setShowAddForm}
        name={name}
        setName={setName}
        subject={subject}
        setSubject={setSubject}
        school_id={school_id}
        setSchoolId={setSchoolId}
      />
    </FormWrapper>
  )
}
