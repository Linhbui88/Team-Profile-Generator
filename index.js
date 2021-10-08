const inquirer = require('inquirer')
const fs= require('fs')
const EmployeeObj = require('./employee')
const EngineerObj= require('./engineer')
const InternObj = require('./intern')
const ManagerObj = require('./manager')


//if role === manager ,generate officenumber
//if role=== engineer ,generate githubuerbame
//if role=== intern, generate school


// var employeeQuestions =[]
// employeeChoices.forEach((choice) =>{
//   employeeQuestions.push(choice.question)
//   })

//   console.log(employeeRoles)
//   console.log(employeeQuestions)

var employeeChoices =[
  {name: 'Manager',
  question:'What is employee office number?',
  },

  {name: 'Engineer',
  question:'What is employee Github Username?'
  },

  {name: 'Intern',
  question:'Which school intern is attending?'
  },
] 

var employeeRoles = []
employeeChoices.forEach((choice) =>{
  
  employeeRoles.push(choice.name)
})

inquirer
.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'What is employee name?'
  },
  {
    type: 'input',
    name: 'id',
    message: 'What is employee ID?'
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is employee email?'
  },
  {
    type: 'list',
    name: 'role',
    message: 'What is employee role',
    choices: employeeRoles,
  },
])
 
.then(answers =>{
  const {name, id, email, role} = answers
  console.log(role)

  
  let employeeQuestion 
    employeeChoices.forEach((choice) =>{
      

      if(role === choice.name) {
        
        employeeQuestion= choice.question
      }
    })


 

  inquirer 
    .prompt([
      {
        type:'input',
        name: 'rolequestion',
        message: employeeQuestion
      }
    ])

    .then(answers => {
      const {rolequestion} = answers
      console.log(name, id, email, role,rolequestion)
    })

//     })
//     console.log(managerQuestions )
// //   var engineerQuestions =
  // inquirer 
  //   .prompt([
  //     {
  //       type:'input',
  //       name: 'github',
  //       message :'What is employee Github Username?'
  //     }

//       ])
// .then(answers => {
//   const {github} =answers
//   console.log(name, id, email, role,github )
//     })
//     console.log(engineerQuestions)

//   var internQuestions =
//   inquirer 
//     .prompt([
//       {
//         type:'input',
//         name: 'school',
//         message :'Which school intern is attending?'
//       }
// ])
// .then(answers => {
//   const {school} =answers
//   console.log(name, id, email, role, school)
// })
// console.log(internQuestions)
    


}) 
.catch()

