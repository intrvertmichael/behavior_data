"use client"

import DropDown from "./DropDown"
import Input from "./Input"

export default function TeacherForm({
  updateItem,
  schools,
  name,
  setName,
  subject,
  setSubject,
  school_id,
  setSchoolId,
}) {
  const updateLabel = updateItem ? "Update " : ""

  return (
    <>
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
    </>
  )
}
