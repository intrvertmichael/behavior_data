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
import TeacherPoints from "../components/TeacherPoints"

export default async function Home({ params, searchParams }) {
  const school = params.school
  const dateParam = searchParams.date
  const selectedTeacher = searchParams.selectedTeacher
  const selectedTeacherDate = searchParams.selectedTeacherDate
  const selectedTeacherPeriod = searchParams.selectedTeacherPeriod

  await initializeDB()

  const teachers = school
    ? await getTeachersBySchoolId(school)
    : await getAllTeachers()

  const students = school
    ? await getStudentsBySchoolId(school)
    : await getAllStudents()

  const schools = await getAllSchools()

  const currentSchool = school && schools.find(s => String(s.id) === school)

  return (
    <div className='grid pb-16 gap-y-6'>
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

      {currentSchool ? (
        <DailySchedule currentSchool={currentSchool} dateParam={dateParam} />
      ) : (
        schools.map(s => (
          <DailySchedule key={s.id} currentSchool={s} dateParam={dateParam} />
        ))
      )}

      <TeacherPoints
        teachers={teachers}
        selectedTeacher={selectedTeacher}
        selectedTeacherDate={selectedTeacherDate}
        selectedTeacherPeriod={selectedTeacherPeriod}
      />

      {/* {mockData.map(day => (
        <DayData key={day.date} studentData={day} />
      ))} */}
    </div>
  )
}
