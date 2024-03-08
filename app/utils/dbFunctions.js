"use server"

import sql from "../db"

export const getAllSchools = async () => await sql`SELECT * FROM schools`

export const getAllTeachers = async () =>
  await sql`
    SELECT 
      teachers.id AS id, 
      teachers.name AS name, 
      teachers.subject AS subject, 
      schools.name AS school_name
    FROM teachers 
    JOIN schools ON teachers.school_id = schools.id
    ORDER BY name
`

export const getAllStudents = async () =>
  await sql`
    SELECT 
      students.id as id, 
      students.name as name, 
      students.age as age, 
      schools.name as school_name
    FROM students
    JOIN schools ON students.school_id = schools.id
    ORDER BY name
`

export const getAllHomerooms = async () => {
  return await sql`
    SELECT 
      homerooms.id as id,
      homerooms.school_id as school_id,
      teachers.name as teacher_name,
      teachers.subject as subject,
      schools.name as school_name
    FROM homerooms
    JOIN teachers
    ON homerooms.teacher_id = teachers.id
    JOIN schools
    ON homerooms.school_id = schools.id
  `
}

export const getHomeroomsBySchoolId = async id => {
  return await sql`
    SELECT 
      homerooms.id as id,
      homerooms.school_id as school_id,
      teachers.name as teacher_name,
      teachers.subject as subject 
    FROM homerooms
    JOIN teachers
    ON homerooms.teacher_id = teachers.id
    WHERE homerooms.school_id = ${id}
  `
}

export const getStudentsById = async id => {
  return await sql`SELECT * FROM students WHERE id = ${id}`
}

export const getStudentsBySchoolId = async id => {
  return await sql`SELECT * FROM students WHERE school_id = ${id}`
}

export const getStudentsByHomeroom = async id => {
  return await sql`SELECT * FROM students WHERE homeroom_id = ${id}`
}

export const getStudentsBySchoolIdWithoutHomeroom = async id => {
  return await sql`
    SELECT * 
    FROM students 
    WHERE homeroom_id IS NULL
    AND school_id = ${id}
  `
}

export const getTeachersBySchoolId = async id => {
  return await sql`SELECT * FROM teachers WHERE school_id = ${id}`
}

export const addStudent = async ({ name, age, grade, school_id }) => {
  return await sql`
    INSERT INTO students (name,age,grade,school_id)
    VALUES (${name}, ${age}, ${grade},${school_id})
    RETURNING *
`
}

export const updateStudent = async ({ id, name, age, grade, school_id }) => {
  return await sql`
    UPDATE students
    SET name=${name}, age=${age}, grade=${grade}, school_id=${school_id} 
    WHERE id=${id}
    RETURNING *
`
}

export const updateStudentHomeroom = async ({ id, homeroom_id }) => {
  return await sql`
    UPDATE students
    SET homeroom_id=${homeroom_id} 
    WHERE id=${id}
    RETURNING *
`
}

export const addTeacher = async ({ name, school_id, subject }) => {
  return await sql`
    INSERT into teachers (name, school_id, subject)
    VALUES (${name}, ${school_id}, ${subject})
    RETURNING *
`
}

export const updateTeacher = async ({ id, name, subject, school_id }) => {
  return await sql`
    UPDATE teachers
    SET name=${name}, subject=${subject}, school_id=${school_id} 
    WHERE id=${id}
    RETURNING *
`
}

export const getStudentsInSchool = async school_id =>
  await sql`
    SELECT 
      students.id AS id,
      students.name AS name, 
      students.age AS age, 
      students.school_id AS school_id, 
      schools.name AS school_name
    FROM students
    JOIN schools 
    ON students.school_id = schools.id
    WHERE school_id = ${school_id}
`
