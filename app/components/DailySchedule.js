import { capitalize, isEmpty } from "lodash"

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

  const schedule = await getDailySchedule({ date, school_id: currentSchool.id })
  const previousDates = await getPreviousDailySchedules()

  return (
    <div className='grid gap-6 p-6 border rounded border-neutral-900'>
      <div className='flex items-center gap-3 text-2xl'>
        <p>Schedule for</p>

        <DatePicker
          value={date}
          previousDates={previousDates.map(d => ({
            id: createISODate(d.date),
            name: createMDYDate(d.date),
            value: createISODate(d.date),
          }))}
        />

        {currentSchool && <p>at {capitalize(currentSchool.name)}</p>}
      </div>

      <div>
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

        <AddDailySchedule currentSchool={currentSchool} date={date} />
      </div>
    </div>
  )
}
