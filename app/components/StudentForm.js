"use client"

import DropDown from "./DropDown"
import Input from "./Input"

export default function StudentForm({
  updateItem,
  schools,
  name,
  setName,
  age,
  setAge,
  grade,
  setGrade,
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
    </>
  )
}
