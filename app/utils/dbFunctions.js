"use server"

import sql from "../db"

export const initializeDB = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS schools (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100)
    );
  `

  await sql`
    INSERT INTO
      schools (id, name)
    SELECT
      '1', 'apple'
    WHERE NOT EXISTS (
      SELECT 1 FROM schools
    );
  `

  await sql`
    CREATE TABLE IF NOT EXISTS teachers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      subject VARCHAR(100),
      school_id INT, FOREIGN KEY (school_id) REFERENCES schools(id)
    );
  `

  await sql`
    INSERT INTO
      teachers (id,name, subject, school_id)
    SELECT
      '1', 'updog', 'philosophy', '1'
    WHERE NOT EXISTS (
      SELECT 1 FROM teachers
    );
  `

  await sql`
    CREATE TABLE IF NOT EXISTS homerooms (
      id SERIAL PRIMARY KEY,
      grade INT, 
      teacher_id INT, FOREIGN KEY (teacher_id) REFERENCES teachers(id),
      school_id INT, FOREIGN KEY (school_id) REFERENCES schools(id)
    );
  `

  await sql`
    INSERT INTO
      homerooms (id, grade, teacher_id, school_id)
    SELECT
      '1', '10', '1', '1'
    WHERE NOT EXISTS (
      SELECT 1 FROM homerooms
    );
  `

  await sql`
    CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      age INT, 
      grade INT, 
      school_id INT, FOREIGN KEY (school_id) REFERENCES schools(id),
      homeroom_id INT, FOREIGN KEY (homeroom_id) REFERENCES homerooms(id)
    );
  `

  await sql`
    INSERT INTO
      students (id, name, age, grade, school_id, homeroom_id)
    SELECT
      '1', 'michael', '35', '10', '1', '1'
    WHERE NOT EXISTS (
      SELECT 1 FROM students
    );
  `

  await sql`
    CREATE TABLE IF NOT EXISTS daily_schedule (
      id SERIAL PRIMARY KEY,
      date DATE,
      school_id INT, FOREIGN KEY (school_id) REFERENCES schools(id),
      teacher_id INT, FOREIGN KEY (teacher_id) REFERENCES teachers(id),
      period1 INT, FOREIGN KEY (period1) REFERENCES homerooms(id),
      period2 INT, FOREIGN KEY (period2) REFERENCES homerooms(id),
      period3 INT, FOREIGN KEY (period3) REFERENCES homerooms(id),
      period4 INT, FOREIGN KEY (period4) REFERENCES homerooms(id),
      period5 INT, FOREIGN KEY (period5) REFERENCES homerooms(id)
    );
`
}

export const getAllSchools = async () => await sql`SELECT * FROM schools`

export const getAllTeachers = async () =>
  await sql`
    SELECT 
      teachers.id AS id, 
      teachers.name AS name, 
      teachers.subject AS subject, 
      schools.name AS school_name,
      schools.id as school_id
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
      students.grade as grade,
      schools.name as school_name,
      schools.id as school_id
    FROM students
    JOIN schools ON students.school_id = schools.id
    ORDER BY name
`

export const getAllHomerooms = async () => {
  return await sql`
    SELECT 
      homerooms.id as id,
      homerooms.school_id as school_id,
      homerooms.grade as grade,
      teachers.name as teacher_name,
      teachers.subject as subject,
      schools.name as school_name
    FROM homerooms
    JOIN teachers
    ON homerooms.teacher_id = teachers.id
    JOIN schools
    ON homerooms.school_id = schools.id
    ORDER BY grade
  `
}

export const getHomeroomsBySchoolId = async id => {
  return await sql`
    SELECT 
      homerooms.id as id,
      homerooms.school_id as school_id,
      homerooms.grade as grade,
      teachers.name as teacher_name,
      teachers.subject as subject 
    FROM homerooms
    JOIN teachers
    ON homerooms.teacher_id = teachers.id
    WHERE homerooms.school_id = ${id}
    ORDER BY grade
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

export const getStudentsBySchoolIdWithoutHomeroom = async (id, grade) => {
  return await sql`
    SELECT * 
    FROM students 
    WHERE homeroom_id IS NULL
    AND school_id = ${id}
    AND grade = ${grade}
  `
}

export const getTeachersBySchoolId = async id => {
  return await sql`SELECT * FROM teachers WHERE school_id = ${id}`
}

export const getTeachersBySchoolIdWithoutHomeroom = async id => {
  return await sql`
    SELECT
      homerooms.id as homeroom_id,
      teachers.id as id,
      teachers.name as name
    FROM teachers
    LEFT JOIN homerooms
    ON homerooms.teacher_id = teachers.id
    WHERE teachers.school_id = ${id}
    AND homerooms.id IS NULL
  `
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

export const removeStudentHomeroom = async ({ id }) => {
  return await sql`
    UPDATE students
    SET homeroom_id= NULL
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

export const addHomeroom = async ({ school_id, teacher_id, grade }) => {
  return await sql`
    INSERT into homerooms (teacher_id, school_id, grade)
    VALUES (${teacher_id}, ${school_id}, ${grade})
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

export const getDailySchedule = async date => {
  return await sql`
    SELECT
      *,
      daily_schedule.id as id,
      p1.id as period1,
      p2.id as period2,
      p3.id as period3,
      p3.id as period4,
      p3.id as period5
    
    FROM daily_schedule
    
    LEFT JOIN teachers period_teacher
    ON daily_schedule.teacher_id = period_teacher.id
    
    LEFT JOIN homerooms P1 ON daily_schedule.period1 = P1.id
    LEFT JOIN homerooms P2 ON daily_schedule.period2 = P2.id
    LEFT JOIN homerooms P3 ON daily_schedule.period3 = P3.id
    LEFT JOIN homerooms P4 ON daily_schedule.period3 = P4.id
    LEFT JOIN homerooms P5 ON daily_schedule.period3 = P5.id

    WHERE date = ${date}
  `
}

export const getPreviousDailySchedules = async () => {
  return await sql`SELECT DISTINCT date FROM daily_schedule`
}

export const addDailySchedule = async ({
  date,
  school_id,
  teacher_id,
  period1,
  period2,
  period3,
  period4,
  period5,
}) => {
  return await sql`
  INSERT into daily_schedule (date, school_id, teacher_id, period1, period2, period3, period4, period5)
  VALUES (${date}, ${school_id}, ${teacher_id}, ${period1}, ${period2}, ${period3}, ${period4}, ${period5})
  RETURNING *
`
}
