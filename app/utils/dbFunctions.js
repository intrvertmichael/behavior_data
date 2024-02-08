"use server"

import sql from "../db"

export const getAllSchools = async () => await sql`select * from schools`
export const getAllTeachers = async () => await sql`select * from teachers`
export const getAllStudents = async () => await sql`select * from students`
export const getAllClasses = async () => await sql`select * from classes`

export const getStudentsById = async id => {
  return await sql`select * from students where id = ${id}`
}

export const getStudentsByClassId = async id => {
  return await sql`select * from students_in_classes where class_id = ${id}`
}

export const getStudentsBySchoolId = async id => {
  return await sql`select * from students where school_id = ${id}`
}

export const getTeachersBySchoolId = async id => {
  return await sql`select * from teachers where school_id = ${id}`
}

export const addStudent = async ({ name, age, grade, school_id }) => {
  return await sql`
  insert into students
    (name,age,grade,school_id)
  values
    (${name}, ${age}, ${grade},${school_id})
  returning *
`
}

export const updateStudent = async ({ id, name, age, grade, school_id }) => {
  return await sql`
    update students
    set
      name=${name}, age=${age}, grade=${grade}, school_id=${school_id} 
    where id=${id}
    returning *
`
}

export const addTeacher = async ({ name, school_id, subject }) => {
  return await sql`
  insert into teachers
    (name, school_id, subject)
  values
    (${name}, ${school_id}, ${subject})
  returning *
`
}

export const updateTeacher = async ({ id, name, subject, school_id }) => {
  return await sql`
    update teachers
    set
      name=${name}, subject=${subject}, school_id=${school_id} 
    where id=${id}
    returning *
`
}
