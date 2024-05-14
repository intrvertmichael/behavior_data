import {
  getDailySchedulesForTeacher,
  getSelectedHomeroom,
  getStudentsByHomeroom,
} from "../utils/dbFunctions"

import TeacherPointsOptions from "./TeacherPointsOptions"

export default async function TeacherPoints({
  teachers,
  selectedTeacher,
  selectedTeacherDate,
  selectedTeacherPeriod,
}) {
  const dailySchedules =
    selectedTeacher && (await getDailySchedulesForTeacher(selectedTeacher))

  const selectedHomeroom =
    selectedTeacherPeriod &&
    (await getSelectedHomeroom({
      teacher_id: selectedTeacher,
      date: selectedTeacherDate,
      selectedTeacherPeriod,
    }))

  const studentsInHomeroom =
    selectedHomeroom && (await getStudentsByHomeroom(selectedHomeroom))

  return (
    <div className='p-6 border border-neutral-900'>
      <TeacherPointsOptions
        teachers={teachers}
        selectedTeacher={selectedTeacher}
        selectedTeacherDate={selectedTeacherDate}
        dailySchedules={dailySchedules}
        selectedTeacherPeriod={selectedTeacherPeriod}
        studentsInHomeroom={studentsInHomeroom}
        selectedHomeroom={selectedHomeroom}
      />
    </div>
  )
}
