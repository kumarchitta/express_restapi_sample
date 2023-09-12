var  Db = require('./dboperations');

const studentToUpdate = {
    "student_id": 1,
    "first_name": "Ulla",
    "last_name": "Raeburn",
    "age": 21,
    "email": "uraeburn0@narod.ru",
    "major": "CSCI",
    "college": "Viterbi",
    "gpa": 2.01,
    "graduation_date": "2023-06-20"
  };
  
async function updateStudent() {
  try {
    const result = await Db.updateStudent(studentToUpdate);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

updateStudent(); // Call the async function to start execution