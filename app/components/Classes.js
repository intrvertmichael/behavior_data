import { capitalize } from "lodash"

import { getAllClasses, getStudentsByClassId } from "../utils/dbFunctions"

async function Class({ c, teachers, students }) {
  const teacherInfo = teachers?.find(t => t.id === c.teacher_id)
  const studentsInClass = c.id && (await getStudentsByClassId(c.id))

  // TODO: is there a way to get all the classes and the student and teacher info in one pg function ?

  // TODO: is there a way to set a maximum number of students for each class so that no more can be added if limit is reached ?

  return (
    <div>
      <p>{`Class ${c.id} - Professor ${capitalize(teacherInfo.name)}`}</p>

      <ul className='pl-4 list-disc text-neutral-500'>
        {studentsInClass?.map(studentInClass => {
          const student = students.find(s => s.id === studentInClass.student_id)

          return (
            <li key={studentInClass.id}>
              {`${student.name} - ${student.age} years old`}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default async function Classes({ teachers, students }) {
  const classes = await getAllClasses()

  return (
    <div className='p-6 border rounded border-neutral-900'>
      <h2 className='pb-6 text-2xl'>Homeroom Classes</h2>

      <div className='grid gap-6'>
        {classes.map(c => (
          <Class key={c.id} c={c} teachers={teachers} students={students} />
        ))}
      </div>
    </div>
  )
}
