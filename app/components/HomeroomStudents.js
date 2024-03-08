"use client"

import { useRouter } from "next/navigation"
import { removeStudentHomeroom } from "../utils/dbFunctions"

export default function HomeroomStudents({ studentsInHomeroom }) {
  const router = useRouter()

  const handleClick = async student => {
    await removeStudentHomeroom({ id: student.id })
    router.refresh()
  }

  return (
    <ul className='pl-4 list-disc text-neutral-500'>
      {studentsInHomeroom?.map(student => {
        return (
          <li
            key={student.id}
            onClick={() => handleClick(student)}
            className='cursor-pointer hover:text-red-500'
          >
            {`${student.name} - ${student.age} years old`}
          </li>
        )
      })}
    </ul>
  )
}
