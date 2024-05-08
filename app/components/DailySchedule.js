import { isEmpty } from "lodash"

import {
  getDailySchedule,
  getPreviousDailySchedules,
} from "../utils/dbFunctions"
import {
  createISODateFromUTC,
  createISODate,
  createMDYDate,
} from "../utils/general"

import AddDailySchedule from "./AddDailySchedule"
import DatePicker from "./DatePicker"

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

export default async function DailySchedule({ currentSchool, dateParam }) {
  const date = dateParam
    ? createISODateFromUTC(dateParam)
    : createISODate(new Date())

  const schedule = await getDailySchedule(date)
  const previousDates = await getPreviousDailySchedules()

  return (
    <div className='p-6 border rounded border-neutral-900'>
      <div>
        <h2 className='pb-6 text-2xl text-neutral-500'>
          Schedule for <span className='text-white'>{createMDYDate(date)}</span>
        </h2>

        <DatePicker
          value={date}
          previousDates={previousDates.map(d => {
            const formattedDate = createISODateFromUTC(d.date)

            return {
              id: formattedDate,
              name: formattedDate,
            }
          })}
        />
      </div>

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
            <TableCell>{day.period1 && `Class ${day.period1}`}</TableCell>
            <TableCell>{day.period2 && `Class ${day.period2}`}</TableCell>
            <TableCell>{day.period3 && `Class ${day.period3}`}</TableCell>
            <TableCell>{day.period4 && `Class ${day.period4}`}</TableCell>
            <TableCell>{day.period5 && `Class ${day.period5}`}</TableCell>
          </div>
        ))}

      <AddDailySchedule currentSchool={currentSchool} />
    </div>
  )
}
