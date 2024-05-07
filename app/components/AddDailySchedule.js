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
      fullWidth
    />
  )
}

export default function AddDailySchedule({ currentSchool }) {
  const router = useRouter()

  const [teacher_id, setTeacherId] = useState()
  const [teachers, setTeachers] = useState([])
  const [homeroomClasses, setHomeroomClasses] = useState([])

  const [period1, setperiod1] = useState("")
  const [period2, setperiod2] = useState("")
  const [period3, setperiod3] = useState("")
  const [period4, setperiod4] = useState("")
  const [period5, setperiod5] = useState("")

  useEffect(() => {
    const getOptions = async () => {
      setTeachers(await getTeachersBySchoolId("1"))

      const homerooms = await getHomeroomsBySchoolId("1")
      setHomeroomClasses(homerooms)

      if (!isEmpty(homerooms)) {
        setperiod1(homerooms[0].id)
        setperiod2(homerooms[0].id)
        setperiod3(homerooms[0].id)
        setperiod4(homerooms[0].id)
        setperiod5(homerooms[0].id)
      }
    }

    getOptions()
  }, [])

  const handleClick = async e => {
    e.preventDefault()

    await addDailySchedule({
      date: new Date(),
      school_id: currentSchool.id,
      teacher_id,
      period1,
      period2,
      period3,
      period4,
      period5,
    })

    router.refresh()
  }

  const homeroomOptions = homeroomClasses.map(homeroom => ({
    name: `Class ${homeroom.id}`,
    id: homeroom.id,
  }))

  if (isEmpty(teachers) || isEmpty(homeroomClasses)) return <></>

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

      <div className='p-3'>
        <Button label='Add Daily Schedule' onClick={handleClick} />
      </div>
    </form>
  )
}
