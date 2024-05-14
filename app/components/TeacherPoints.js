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
    selectedTeacher &&
    selectedTeacherDate &&
    selectedTeacherPeriod &&
    (await getSelectedHomeroom({
      teacher_id: selectedTeacher,
      date: selectedTeacherDate,
      selectedTeacherPeriod,
    }))

  const studentsInHomeroom =
    selectedHomeroom && (await getStudentsByHomeroom(selectedHomeroom))

  return (
    <TeacherPointsOptions
      teachers={teachers}
      selectedTeacher={selectedTeacher}
      selectedTeacherDate={selectedTeacherDate}
      dailySchedules={dailySchedules}
      selectedTeacherPeriod={selectedTeacherPeriod}
      studentsInHomeroom={studentsInHomeroom}
      selectedHomeroom={selectedHomeroom}
    />
  )
}
