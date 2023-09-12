var  config = require('./dbconfig');
const  sql = require('mssql');

async  function  getStudents() {
  console.log(config);
    let  pool = await  sql.connect(config);
    let  students = await  pool.request().query("SELECT * from dbo.STUDENTS");
    return  students.recordsets;
  }
  

async  function  getStudent(student_id) {
    let  pool = await  sql.connect(config);
    let  student = await  pool.request()
    .input('id', sql.Int, student_id)
    .query("SELECT * from dbo.STUDENTS where student_id = @id");
    return  student.recordset;
  }

  
  async  function  addStudent(student) {
    console.log(student);
    let  pool = await  sql.connect(config);

    let  insertStudent = await  pool.request()
    .input('first_name', sql.NVarChar, student.first_name)
    .input('last_name', sql.NVarChar, student.last_name)
    .input('age', sql.SmallInt, student.age)
    .input('email',sql.NVarChar, student.email)
    .input('major',sql.NVarChar,student.major)
    .input('college',sql.NVarChar,student.college)
    .input('gpa',sql.Int,student.gpa)
    .input('graduation_date',sql.Date,student.graduation_date)
    .query('insert into dbo.STUDENTS(first_name, last_name, age, email, major, college, gpa, graduation_date) ' 
            + ' values(@first_name, @last_name, @age, @email, @major, @college, @gpa, @graduation_date)');
    return  insertStudent;
  }

  async function  updateStudent(student) {
    console.log(student);
    let  pool =  await sql.connect(config);

    const updatedStudent =  await pool.request()
    .input('id', sql.Int, student.student_id)
    .input('first_name', sql.NVarChar, student.first_name)
    .input('last_name', sql.NVarChar, student.last_name)
    .input('age', sql.SmallInt, student.age)
    .input('email',sql.NVarChar, student.email)
    .input('major',sql.NVarChar,student.major)
    .input('college',sql.NVarChar,student.college)
    .input('gpa',sql.Int,student.gpa)
    .input('graduation_date',sql.DateTime,student.graduation_date)
    .query('update dbo.STUDENTS set first_name=@first_name, last_name=@last_name, age=@age, email=@email,' 
      + ' major=@major, college=@college, gpa=@gpa, graduation_date=@graduation_date where student_id=@id');
    return updatedStudent;
  }  

  async  function  deleteStudent(student_id) {
    let  pool = await  sql.connect(config);
    let  result = await  pool.request()
    .input('id', sql.Int, student_id)
    .query("DELETE from dbo.STUDENTS where student_id = @id");
    return  result;
  }

  module.exports = {
    getStudents:  getStudents,
    getStudent:  getStudent,
    addStudent:  addStudent,
    updateStudent: updateStudent,
    deleteStudent: deleteStudent
  }
  