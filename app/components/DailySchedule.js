import { isEmpty } from "lodash"

import { getDailySchedule } from "../utils/dbFunctions"
import { createFullDateISO, createFullDateMDY } from "../utils/general"

import AddDailySchedule from "./AddDailySchedule"

function TableCell({ children, isHeading }) {
  return (
    <div
      className={`p-3 border ${
        isHeading ? "border-white" : "border-neutral-900"
      }`}
    >
      {children}
    </div>
  )
}

export default async function DailySchedule({ currentSchool }) {
  const date = createFullDateISO(new Date())
  const schedule = await getDailySchedule(date)

  // TODO: NEED TO ADD CASE FOR NO SCHOOL SELECTED

  return (
    <div className='p-6 border rounded border-neutral-900'>
      <h2 className='pb-6 text-2xl text-neutral-500'>
        Schedule for{" "}
        <span className='text-white'>{createFullDateMDY(date)}</span>
      </h2>

      <div className='grid grid-cols-6'>
        <TableCell isHeading>Subject</TableCell>
        <TableCell isHeading>Period 1</TableCell>
        <TableCell isHeading>Period 2</TableCell>
        <TableCell isHeading>Period 3</TableCell>
        <TableCell isHeading>Period 4</TableCell>
        <TableCell isHeading>Period 5</TableCell>
      </div>

      {!isEmpty(schedule) &&
        schedule.map(day => (
          <div key={day.id} className='grid grid-cols-6'>
            <TableCell>{day.subject}</TableCell>
            <TableCell>Class {day.period1}</TableCell>
            <TableCell>Class {day.period2}</TableCell>
            <TableCell>Class {day.period3}</TableCell>
            <TableCell>Class {day.period4}</TableCell>
            <TableCell>Class {day.period5}</TableCell>
          </div>
        ))}

      <AddDailySchedule currentSchool={currentSchool} />
    </div>
  )
}
