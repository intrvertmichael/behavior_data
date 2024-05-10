"use client"

import { useCallback } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { isEmpty } from "lodash"

import {
  createISODate,
  createMDYDate,
  createParamQuery,
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

  const createParamQueryCallback = useCallback(createParamQuery, [searchParams])

  const handleTeacherChange = e => {
    router.push(
      isEmpty(e.target.value)
        ? pathname
        : pathname +
            "?" +
            createParamQueryCallback(
              "selectedTeacher",
              e.target.value,
              searchParams,
            ),
    )
  }

  const handleTeacherDateChange = e => {
    router.push(
      isEmpty(e.target.value)
        ? pathname
        : pathname +
            "?" +
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
        ? pathname
        : pathname +
            "?" +
            createParamQueryCallback(
              "selectedTeacherPeriod",
              e.target.value,
              searchParams,
            ),
    )
  }

  return (
    <div>
      <DropDown
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
            value={selectedTeacherDate || ""}
            onChange={handleTeacherDateChange}
            defaultItem={{
              value: "",
              id: "",
              name: "- Please Choose a date -",
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
              name: "- Please Choose a period -",
            }}
            items={["period1", "period2", "period3", "period4", "period5"]?.map(
              d => {
                return { id: d, name: d.substring(d.length - 1), value: d }
              },
            )}
          />

          {selectedHomeroom && (
            <div>
              <p>Class {selectedHomeroom} Students:</p>

              <div>
                {studentsInHomeroom?.map(s => (
                  <p key={s.id}>{s.name}</p>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
