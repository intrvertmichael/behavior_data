import {
  getAllSchools,
  getAllStudents,
  getAllTeachers,
  getStudentsBySchoolId,
  getTeachersBySchoolId,
  initializeDB,
} from "../utils/dbFunctions"
import { mockData } from "../constants/mock"

import DayData from "../components/DayData"
import ListWrapper from "../components/ListWrapper"
import SchoolDropDown from "../components/SchoolDropdown"
import Homerooms from "../components/Homerooms"
import DailySchedule from "../components/DailySchedule"

export default async function Home({ params }) {
  await initializeDB()

  const teachers = params.school
    ? await getTeachersBySchoolId(params.school)
    : await getAllTeachers()

  const students = params.school
    ? await getStudentsBySchoolId(params.school)
    : await getAllStudents()

  const schools = await getAllSchools()

  const currentSchool =
    params.school && schools.find(school => String(school.id) === params.school)

  return (
    <div className='grid gap-y-6'>
      <SchoolDropDown items={schools} />

      <h2 className='p-6 text-3xl'>
        {currentSchool ? `Current School: ${currentSchool.name}` : "All"}
      </h2>

      <div className='grid grid-cols-2'>
        <ListWrapper
          label='teachers'
          items={teachers}
          currentSchool={currentSchool}
          schools={schools}
          teachers
        />

        <ListWrapper
          label='students'
          items={students}
          currentSchool={currentSchool}
          schools={schools}
          students
        />
      </div>

      <Homerooms currentSchool={currentSchool} />

      <DailySchedule currentSchool={currentSchool} />

      {/* {mockData.map(day => (
        <DayData key={day.date} studentData={day} />
      ))} */}
    </div>
  )
}
