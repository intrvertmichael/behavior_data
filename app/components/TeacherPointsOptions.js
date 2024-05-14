"use client"

import { useCallback } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { isEmpty } from "lodash"

import {
  createISODate,
  createMDYDate,
  createParamQuery,
  removeParamQuery,
} from "../utils/general"

import DropDown from "./DropDown"

export default function TeacherPointsOptions({
  selectedTeacher,
  selectedTeacherDate,
  selectedTeacherPeriod,
  teachers,
  dailySchedules,
  studentsInHomeroom,
  selectedHomeroom,
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const removeParamQueryCallback = useCallback(removeParamQuery, [searchParams])
  const createParamQueryCallback = useCallback(createParamQuery, [searchParams])

  const handleTeacherChange = e => {
    router.push(pathname)

    router.push(
      isEmpty(e.target.value)
        ? pathname + removeParamQueryCallback("selectedTeacher")
        : pathname +
            createParamQueryCallback("selectedTeacher", e.target.value),
    )
  }

  const handleTeacherDateChange = e => {
    router.push(
      isEmpty(e.target.value)
        ? pathname +
            removeParamQueryCallback("selectedTeacherDate", searchParams)
        : pathname +
            createParamQueryCallback(
              "selectedTeacherDate",
              e.target.value,
              searchParams,
            ),
    )
  }

  const handleSelectedTeacherPeriodChange = e => {
    router.push(
      isEmpty(e.target.value)
        ? pathname +
            removeParamQueryCallback("selectedTeacherPeriod", searchParams)
        : pathname +
            createParamQueryCallback(
              "selectedTeacherPeriod",
              e.target.value,
              searchParams,
            ),
    )
  }

  return (
    <div className='grid gap-3 p-6 border border-neutral-900'>
      <h2 className='text-2xl'>Teacher&apos;s View</h2>

      <DropDown
        label='Teacher'
        value={selectedTeacher || ""}
        onChange={handleTeacherChange}
        defaultItem={{ value: "", id: "", name: "- Please Choose a teacher -" }}
        items={teachers.map(t => ({
          ...t,
          name: `${t.name} | ${t.subject}`,
          value: t.id,
        }))}
      />

      {selectedTeacher && (
        <>
          <DropDown
            label='Date'
            value={selectedTeacherDate || ""}
            onChange={handleTeacherDateChange}
            defaultItem={{
              value: "",
              id: "",
              name: "- Choose a date -",
            }}
            items={dailySchedules?.map(d => {
              const date = createISODate(d.date)
              return { id: date, name: createMDYDate(date), value: date }
            })}
          />

          <DropDown
            label='Period'
            value={selectedTeacherPeriod || ""}
            onChange={handleSelectedTeacherPeriodChange}
            defaultItem={{
              value: "",
              id: "",
              name: "--",
            }}
            items={["period1", "period2", "period3", "period4", "period5"]?.map(
              d => {
                return { id: d, name: d.substring(d.length - 1), value: d }
              },
            )}
          />

          {selectedHomeroom && (
            <div className='grid gap-3 p-3'>
              <p>Class {selectedHomeroom} Students</p>
              <div>
                {studentsInHomeroom?.map(s => (
                  <p key={s.id} className='py-1'>
                    {s.name}
                  </p>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
