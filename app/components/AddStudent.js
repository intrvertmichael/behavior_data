import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import StudentForm from "./StudentForm"
import FormWrapper from "./FormWrapper"
import { addStudent, updateStudent } from "../utils/dbFunctions"

export default function AddStudent({
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

  return (
    <FormWrapper
      closeWindow={closeWindow}
      handleSubmit={handleSubmit}
      updateItem={updateItem}
    >
      <StudentForm
        updateItem={updateItem}
        setUpdateItem={setUpdateItem}
        schools={schools}
        setShowAddForm={setShowAddForm}
        name={name}
        setName={setName}
        age={age}
        setAge={setAge}
        grade={grade}
        setGrade={setGrade}
        school_id={school_id}
        setSchoolId={setSchoolId}
      />
    </FormWrapper>
  )
}
