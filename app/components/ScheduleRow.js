"use client"

import { useRouter } from "next/navigation"

import { removeDailySchedule } from "../utils/dbFunctions"

import ScheduleCell from "./ScheduleCell"

export default function ScheduleRow({ day }) {
  const router = useRouter()

  const handleClick = async () => {
    if (confirm("are you sure you want to remove this row ?")) {
      await removeDailySchedule(day.id)
      router.refresh()
    }
  }

  return (
    <div
      key={day.id}
      className='grid grid-cols-6 border border-transparent cursor-pointer hover:border-red-500'
      onClick={handleClick}
    >
      <ScheduleCell>{day.subject}</ScheduleCell>
      <ScheduleCell>{day.period1 && `Class ${day.period1}`}</ScheduleCell>
      <ScheduleCell>{day.period2 && `Class ${day.period2}`}</ScheduleCell>
      <ScheduleCell>{day.period3 && `Class ${day.period3}`}</ScheduleCell>
      <ScheduleCell>{day.period4 && `Class ${day.period4}`}</ScheduleCell>
      <ScheduleCell>{day.period5 && `Class ${day.period5}`}</ScheduleCell>
    </div>
  )
}
