import { isEmpty } from "lodash"
import { getDailySchedule } from "../utils/dbFunctions"
import { createFullDate } from "../utils/general"

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

export default async function DailySchedule() {
  const schedule = await getDailySchedule("2023-01-01")

  if (isEmpty(schedule)) return <></>

  const date = createFullDate(schedule[0].date)

  return (
    <div className='p-6 border rounded border-neutral-900'>
      <h2 className='pb-6 text-2xl text-neutral-500'>
        Schedule for <span className='text-white'>{date}</span>
      </h2>

      <div className='grid grid-cols-6'>
        <TableCell isHeading>Subject</TableCell>
        <TableCell isHeading>Period 1</TableCell>
        <TableCell isHeading>Period 2</TableCell>
        <TableCell isHeading>Period 3</TableCell>
        <TableCell isHeading>Period 4</TableCell>
        <TableCell isHeading>Period 5</TableCell>
      </div>

      {schedule.map(day => (
        <div key={day.id} className='grid grid-cols-6'>
          <TableCell>{day.subject}</TableCell>
          <TableCell>Class {day.period1}</TableCell>
          <TableCell>Class {day.period2}</TableCell>
          <TableCell>Class {day.period3}</TableCell>
          <TableCell>Class {day.period4}</TableCell>
          <TableCell>Class {day.period5}</TableCell>
        </div>
      ))}
    </div>
  )
}
