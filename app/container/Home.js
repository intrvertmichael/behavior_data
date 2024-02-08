import {
  getAllSchools,
  getAllStudents,
  getAllTeachers,
  getStudentsBySchoolId,
  getTeachersBySchoolId,
} from "../utils/dbFunctions"

import DayData from "../components/DayData"
import StudentList from "../components/StudentList"
import TeacherList from "../components/TeacherList"
import SchoolDropDown from "../components/SchoolDropdown"
import Classes from "../components/Classes"

const mockDayData = {
  date: "January 15, 2024",
  behavior: [
    {
      period: 0,
      behaved: true,
      worked: true,
    },
    {
      period: 1,
      behaved: true,
      worked: true,
    },
    {
      period: 2,
      behaved: true,
      worked: false,
    },
    {
      period: 3,
      behaved: false,
      worked: false,
    },
    {
      period: 4,
      behaved: false,
      worked: true,
    },
    {
      period: 5,
      behaved: true,
      worked: true,
    },
    {
      period: 6,
      behaved: false,
      worked: false,
    },
    {
      period: 7,
      behaved: true,
      worked: true,
    },
    {
      period: 8,
      behaved: true,
      worked: false,
    },
  ],
}

const mockDayData2 = {
  date: "January 16, 2024",
  behavior: [
    {
      period: 0,
      behaved: true,
      worked: true,
    },
    {
      period: 1,
      behaved: true,
      worked: true,
    },
    {
      period: 2,
      behaved: true,
      worked: false,
    },
    {
      period: 3,
      behaved: false,
      worked: false,
    },
    {
      period: 4,
      behaved: false,
      worked: true,
    },
    {
      period: 5,
      behaved: true,
      worked: true,
    },
    {
      period: 6,
      behaved: false,
      worked: false,
    },
    {
      period: 7,
      behaved: true,
      worked: true,
    },
    {
      period: 8,
      behaved: true,
      worked: false,
    },
  ],
}

const mockData = [mockDayData, mockDayData2]

export default async function Home({ params }) {
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
        <TeacherList
          label='teachers'
          items={teachers}
          currentSchool={currentSchool}
          schools={schools}
        />

        <StudentList
          label='students'
          items={students}
          currentSchool={currentSchool}
          schools={schools}
        />
      </div>

      {teachers && students && (
        <Classes teachers={teachers} students={students} />
      )}

      {/* {mockData.map(day => (
        <DayData key={day.date} studentData={day} />
      ))} */}
    </div>
  )
}
