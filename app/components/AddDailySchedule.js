"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isEmpty } from "lodash"

import {
  addDailySchedule,
  getHomeroomsBySchoolId,
  getTeachersBySchoolId,
} from "../utils/dbFunctions"

import DropDown from "./DropDown"
import Button from "./Button"

function HomeroomClassDropDown({ value, onChange, items }) {
  return (
    <DropDown
      value={value}
      onChange={onChange}
      items={items}
      divClassname='p-3'
      defaultItem={{ value: "", name: "- Please Choose -" }}
      fullWidth
      required
    />
  )
}

export default function AddDailySchedule({ currentSchool, date }) {
  const router = useRouter()

  const [teacher_id, setTeacherId] = useState()
  const [teachers, setTeachers] = useState()
  const [homeroomClasses, setHomeroomClasses] = useState()
  const [period1, setperiod1] = useState()
  const [period2, setperiod2] = useState()
  const [period3, setperiod3] = useState()
  const [period4, setperiod4] = useState()
  const [period5, setperiod5] = useState()

  const formNotComplete =
    isEmpty(teacher_id) ||
    isEmpty(period1) ||
    isEmpty(period2) ||
    isEmpty(period3) ||
    isEmpty(period4) ||
    isEmpty(period5)

  useEffect(() => {
    const getOptions = async () => {
      if (isEmpty(currentSchool.id)) return
      setTeachers(await getTeachersBySchoolId(currentSchool.id))
      setHomeroomClasses(await getHomeroomsBySchoolId(currentSchool.id))
    }

    getOptions()
  }, [currentSchool])

  const handleClick = async e => {
    e.preventDefault()

    if (formNotComplete) return

    await addDailySchedule({
      date,
      school_id: currentSchool.id,
      teacher_id,
      period1,
      period2,
      period3,
      period4,
      period5,
    })

    setTeacherId("")
    setperiod1("")
    setperiod2("")
    setperiod3("")
    setperiod4("")
    setperiod5("")

    router.refresh()
  }

  if (isEmpty(currentSchool) || isEmpty(teachers) || isEmpty(homeroomClasses)) {
    return <></>
  }

  const homeroomOptions = homeroomClasses.map(homeroom => ({
    name: `Class ${homeroom.id}`,
    id: homeroom.id,
  }))

  return (
    <form className='border border-neutral-900'>
      <div className='grid grid-cols-6'>
        <HomeroomClassDropDown
          value={teacher_id}
          onChange={e => setTeacherId(e.target.value)}
          items={teachers.map(teacher => ({
            id: teacher.id,
            name: teacher.subject,
          }))}
        />

        <HomeroomClassDropDown
          value={period1}
          onChange={e => setperiod1(e.target.value)}
          items={homeroomOptions}
        />

        <HomeroomClassDropDown
          value={period2}
          onChange={e => setperiod2(e.target.value)}
          items={homeroomOptions}
        />

        <HomeroomClassDropDown
          value={period3}
          onChange={e => setperiod3(e.target.value)}
          items={homeroomOptions}
        />

        <HomeroomClassDropDown
          value={period4}
          onChange={e => setperiod4(e.target.value)}
          items={homeroomOptions}
        />

        <HomeroomClassDropDown
          value={period5}
          onChange={e => setperiod5(e.target.value)}
          items={homeroomOptions}
        />
      </div>

      {!formNotComplete && (
        <div className='p-3'>
          <Button label='Add Daily Schedule' onClick={handleClick} />
        </div>
      )}
    </form>
  )
}
