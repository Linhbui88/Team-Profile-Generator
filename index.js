const inquirer = require('inquirer')
const fs= require('fs')
const EmployeeObj = require('./employee')
const EngineerObj= require('./engineer')
const InternObj = require('./intern')
const ManagerObj = require('./manager')
const { profile } = require('console')


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
  const {name, id, email, role,} = answers
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
        name: 'roleQuestion',
        message: employeeQuestion
      }
    ])

    .then(answers => {
      const {roleQuestion} = answers
      let roleAnswer = answers.roleQuestion.toLowerCase()
      console.log(roleQuestion)
      
      // console.log(answers)
      console.log(name, id, email, role,roleAnswer)

      let generateChoice 

      if(role.toLowerCase() === 'manager'){
        generateChoice =`Office number :${roleAnswer}`
        
      }
    
      if(role.toLowerCase() === 'engineer'){
        generateChoice = `GitHub: ${roleAnswer}`
      }
      if(role.toLowerCase() === 'intern'){
        generateChoice = `School: ${roleAnswer}`

      }
      console.log(generateChoice )

      let teamGenerate = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Profile Generate</title>
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
        <script src="https://kit.fontawesome.com/5d99d13882.js" crossorigin="anonymous"></script>
      </head>
      
      <body>
       <header class="bg-red-500 py-5">
         <h1 class="text-center text-white text-lg">My Team</h1>
       </header>
      
      <section class="m-5 p-5"><div id="employee" class="md:flex">
         
        <div id="manager" class="flex-1 m-4">
          <div id ="employee-header" class="flex-1 bg-blue-500 text-white text-base p-3">
              <h2>${employee.name}</h2>
              <h2><i class="fas fa-mug-hot"></i> ${role}</h2>
          </div>
          <div id="employee-body" class="p-3 bg-gray-200 py-7 px-5">
            <div class="flex flex-col bg-white">
              <div class=" border border-gray-300 p-2" >ID: ${id}</div>
              <div class=" border border-gray-300 p-2" >Email:<a href="mailto: ${email}">${email}</a></div>
              <div class=" border border-gray-300 p-2" >${generateChoice}</div>
            </div>
          </div>
        </div>
      </div>
      </section>
      
      </body>
      </html>
      `
  fs.writeFile('index.html',teamGenerate, (err)=>{
    console.log(err)
    console.log('Generate team profile...')
  })
}) 
})

.catch()

