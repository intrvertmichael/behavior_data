"use client"

import { useState } from "react"

import List from "./List"
import TeacherForm from "./TeacherForm"

export default function TeacherList({ label, items, currentSchool, schools }) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [updateItem, setUpdateItem] = useState()

  const handleItemClick = item => setUpdateItem(item)

  return (
    <div className='relative grid content-start p-6 border border-neutral-900'>
      <button
        className='absolute top-3 right-6'
        onClick={() => {
          setUpdateItem()
          setShowAddForm(true)
        }}
      >
        + Add Teacher
      </button>

      <List
        label={label}
        items={items}
        handleItemClick={handleItemClick}
        currentSchool={currentSchool}
        schools={schools}
      />

      {(updateItem || showAddForm) && (
        <TeacherForm
          updateItem={updateItem}
          setUpdateItem={setUpdateItem}
          schools={schools}
          setShowAddForm={setShowAddForm}
        />
      )}
    </div>
  )
}
