"use client"

import { useState } from "react"

import List from "./List"
import AddTeacher from "./AddTeacher"
import AddStudent from "./AddStudent"

export default function ListWrapper({
  label,
  items,
  currentSchool,
  schools,
  teachers,
  students,
}) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [updateItem, setUpdateItem] = useState()

  const handleItemClick = item => setUpdateItem(item)

  return (
    <div className='relative grid content-start p-6 border border-neutral-900'>
      <button
        className='absolute top-3 right-6'
        onClick={() => {
          if (showAddForm) {
            setShowAddForm(false)
            return
          }

          setUpdateItem()
          setShowAddForm(true)
        }}
      >
        {`+ Add ${teachers ? "Teacher" : ""}${students ? "Student" : ""}`}
      </button>

      <List
        label={label}
        items={items}
        handleItemClick={handleItemClick}
        currentSchool={currentSchool}
      />

      {(updateItem || showAddForm) && (
        <>
          {teachers && (
            <AddTeacher
              updateItem={updateItem}
              setUpdateItem={setUpdateItem}
              setShowAddForm={setShowAddForm}
              schools={schools}
            />
          )}

          {students && (
            <AddStudent
              updateItem={updateItem}
              setUpdateItem={setUpdateItem}
              setShowAddForm={setShowAddForm}
              schools={schools}
            />
          )}
        </>
      )}
    </div>
  )
}
