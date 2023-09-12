const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
var  Db = require('./dboperations');
var  express = require('express');
var  bodyParser = require('body-parser');
var  cors = require('cors');

var  app = express();
var  router = express.Router();

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

router.use((request, response, next) => {
    console.log('middleware');
    next();
  });
   
   
// get all students
router.route('/students').get((request, response) => {

Db.getStudents().then((data) => {
    response.json(data[0]);
})
})

// get student by id
router.route('/students/:id').get((request, response) => {
    /* #swagger.parameters['id'] = {
        id: ""
        } 
    */
    Db.getStudent(request.params.id).then((data) => {
        response.json(data[0]);
    })
})

// add student
router.route('/students').post((request, response) => {
        /*  
        #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Add a student',
                schema: {
                    $first_name:"",
                    $last_name:"",
                    $age:0,
                    $email:"",
                    $major:"",
                    $college:"",
                    $gpa:0,
                    $graduation_date:""
                }
        }
        */
let  student = { ...request.body }
Db.addStudent(student).then(data  => {
    response.status(201).json(data);
})
})

// update student
router.route('/students').put((request, response) => {
        /*  
        #swagger.parameters['obj'] = {
                in: 'body',
                description: 'update a student',
                schema: { 
                    $student_id: 0,
                    $first_name:"",
                    $last_name:"",
                    $age:0,
                    $email:"",
                    $major:"",
                    $college:"",
                    $gpa:0,
                    $graduation_date:""
                }
        }
        */    
    let student = { ...request.body }
    Db.updateStudent(student).then(data  => {
        console.log(data);
        response.status(200).json(data);
    })
    })

// delete student by id
router.route('/students/:id').delete((request, response) => {
    /* #swagger.parameters['id'] = {
        id: ""
        } 
    */
    Db.deleteStudent(request.params.id).then((data) => {
        response.json(data[0]);
    })
})

var  port = 9001;
app.listen(port);
console.log('Student Clubs API is runnning at ' + port);