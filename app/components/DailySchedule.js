import { isEmpty } from "lodash"

import {
  getDailySchedule,
  getPreviousDailySchedules,
} from "../utils/dbFunctions"
import { createISODate, createMDYDate } from "../utils/general"

import AddDailySchedule from "./AddDailySchedule"
import DatePicker from "./DatePicker"
import ScheduleCell from "./ScheduleCell"
import ScheduleRow from "./ScheduleRow"

export default async function DailySchedule({ currentSchool, dateParam }) {
  const date = createISODate(dateParam)

  const schedule = await getDailySchedule(date)
  const previousDates = await getPreviousDailySchedules()

  return (
    <div className='p-6 border rounded border-neutral-900'>
      <div className='flex items-center gap-3 pb-6'>
        <h2 className='text-2xl text-neutral-500'>Schedule for</h2>

        <DatePicker
          value={date}
          previousDates={previousDates.map(d => ({
            id: createISODate(d.date),
            name: createMDYDate(d.date),
          }))}
        />
      </div>

      <div className='grid grid-cols-6 mb-1'>
        <ScheduleCell isHeading>Subject</ScheduleCell>
        <ScheduleCell isHeading>Period 1</ScheduleCell>
        <ScheduleCell isHeading>Period 2</ScheduleCell>
        <ScheduleCell isHeading>Period 3</ScheduleCell>
        <ScheduleCell isHeading>Period 4</ScheduleCell>
        <ScheduleCell isHeading>Period 5</ScheduleCell>
      </div>

      {!isEmpty(schedule) &&
        schedule.map(day => <ScheduleRow key={day.id} day={day} />)}

      <AddDailySchedule currentSchool={currentSchool} />
    </div>
  )
}
