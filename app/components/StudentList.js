"use client"

import { useState } from "react"

import List from "./List"
import StudentForm from "./StudentForm"

export default function StudentList({ label, items, currentSchool, schools }) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [updateItem, setUpdateItem] = useState()

  const handleItemClick = item => setUpdateItem(item)

  return (
    <div className='relative grid content-start p-6 border border-neutral-900'>
      <button
        className='absolute right-6 top-3'
        onClick={() => {
          setUpdateItem()
          setShowAddForm(true)
        }}
      >
        + Add Student
      </button>

      <List
        label={label}
        items={items}
        handleItemClick={handleItemClick}
        currentSchool={currentSchool}
        schools={schools}
      />

      {(updateItem || showAddForm) && (
        <StudentForm
          updateItem={updateItem}
          setUpdateItem={setUpdateItem}
          schools={schools}
          setShowAddForm={setShowAddForm}
        />
      )}
    </div>
  )
}
