import { capitalize } from "lodash"

import {
  getAllHomerooms,
  getAllSchools,
  getHomeroomsBySchoolId,
  getStudentsByHomeroom,
  getStudentsBySchoolIdWithoutHomeroom,
} from "../utils/dbFunctions"

import AddStudentToHomeroom from "./AddStudentToHomeroom"
import HomeroomStudents from "./HomeroomStudents"
import AddHomeroom from "./AddHomeroom"

async function Homeroom({ homeroom, currentSchool }) {
  const studentsInHomeroom = await getStudentsByHomeroom(homeroom.id)

  // TODO: is there a way to set a maximum number of students for each class so that no more can be added if limit is reached ?

  const remainingStudents = await getStudentsBySchoolIdWithoutHomeroom(
    homeroom.school_id,
    homeroom.grade,
  )

  return (
    <div className='flex flex-col gap-6 p-6 border rounded border-neutral-900'>
      <div>
        <p>{`Class ${homeroom.id} Grade ${homeroom.grade} ${
          currentSchool ? "" : `at ${homeroom.school_name}`
        }`}</p>

        <p className='text-neutral-400'>{`Professor ${capitalize(
          homeroom.teacher_name,
        )}`}</p>
      </div>

      <HomeroomStudents studentsInHomeroom={studentsInHomeroom} />

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

  const schools = await getAllSchools()

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

        <AddHomeroom schools={schools} />
      </div>
    </div>
  )
}
