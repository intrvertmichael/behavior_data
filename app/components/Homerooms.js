import { capitalize } from "lodash"

import {
  getAllHomerooms,
  getHomeroomsBySchoolId,
  getStudentsByHomeroom,
  getStudentsBySchoolIdWithoutHomeroom,
} from "../utils/dbFunctions"

import AddStudentToHomeroom from "./AddStudentToHomeroom"

async function Homeroom({ homeroom, currentSchool }) {
  const studentsInHomeroom = await getStudentsByHomeroom(homeroom.id)

  // TODO: is there a way to set a maximum number of students for each class so that no more can be added if limit is reached ?

  const remainingStudents = await getStudentsBySchoolIdWithoutHomeroom(
    homeroom.school_id,
  )

  return (
    <div className='p-6 border rounded'>
      <p>{`Class ${homeroom.id} ${
        currentSchool ? "" : `at ${homeroom.school_name}`
      } - Professor ${capitalize(homeroom.teacher_name)}`}</p>

      <ul className='pl-4 list-disc text-neutral-500'>
        {studentsInHomeroom?.map(student => {
          return (
            <li key={student.id}>
              {`${student.name} - ${student.age} years old`}
            </li>
          )
        })}
      </ul>

      <AddStudentToHomeroom
        students={remainingStudents}
        homeroom_id={homeroom.id}
      />
    </div>
  )
}

export default async function Homerooms({ currentSchool }) {
  const homerooms = currentSchool
    ? await getHomeroomsBySchoolId(currentSchool.id)
    : await getAllHomerooms()

  return (
    <div className='p-6 border rounded border-neutral-900'>
      <h2 className='pb-6 text-2xl'>
        {`${currentSchool ? currentSchool.name : ""} Homeroom Classes`}
      </h2>

      <div className='grid grid-cols-3 gap-6'>
        {homerooms.map(homeroom => (
          <Homeroom
            key={homeroom.id}
            homeroom={homeroom}
            currentSchool={currentSchool}
          />
        ))}
      </div>
    </div>
  )
}
