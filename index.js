const inquirer = require('inquirer')
const fs= require('fs')
const Engineer = require('./classes/engineer')
const Intern = require('./classes/intern')
const Manager = require('./classes/manager')


async function main() {
  const managerAnswers = await inquirer
  .prompt([
    {
      type: 'input',
      name: 'managerName',
      message: 'What is manager name?'
    },
    {
      type: 'input',
      name: 'managerEmployeeId',
      message: 'What is manager employee ID?'
    },
    {
      type: 'input',
      name: 'managerEmail',
      message: 'What is manager employee email?'
    },
    {
      type: 'input',
      name: 'managerOfficeNumber',
      message: 'What is manager office number?'
    },
  ])


  const { managerName, managerEmployeeId, managerEmail, managerOfficeNumber } = managerAnswers
  const manager = new Manager(managerName, managerEmployeeId, managerEmail, managerOfficeNumber)

  const employees = [manager] 
  

  let addOrFinish
  do {
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'addOrFinish',
        message: 'What would you like to do?',
        choices: [
          'Add an engineer',
          'Add an intern',
          'Finish building my team'
        ]
      }
    ])
    addOrFinish = answer.addOrFinish
    
    const employeeQuestions = [
      {
        type: 'input',
        name: 'employeeName',
        message: 'What is employee name?'
      },
      {
        type: 'input',
        name: 'employeeId',
        message: 'What is employee ID?'
      },
      {
        type: 'input',
        name: 'employeeEmail',
        message: 'What is employee email?'
      }
    ]

    if (addOrFinish === "Add an engineer") {
      employeeQuestions.push({
        type: 'input',
        name: 'engineerGitHub',
        message: 'What is github username?'
      })
    } else if (addOrFinish === "Add an intern") {
      employeeQuestions.push({
        type: 'input',
        name: 'internSchool',
        message: 'What is school?'
      })
    }

    if (addOrFinish !== 'Finish building my team') {
      const employeeAnswers = await inquirer.prompt(employeeQuestions)

      const { employeeName, employeeId, employeeEmail } = employeeAnswers
        let employee
        if (addOrFinish === "Add an engineer") {
          employee = new Engineer(employeeName, employeeId, employeeEmail, employeeAnswers.engineerGitHub)
        } else if (addOrFinish === "Add an intern") {
          employee = new Intern(employeeName, employeeId, employeeEmail, employeeAnswers.internSchool)
        }
        employees.push(employee)
    }
  } while (addOrFinish !== 'Finish building my team')
  

  // GENERATE HTML  
  let generateHTMLTemplate =`<!DOCTYPE html>
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
   <section class="m-5 p-5 md:flex">
   
  `
  employees.forEach(employee =>{
    let employeeGenerate =
`<div id="employee" class="flex-1">
      
  <div class="m-4">
    <div id ="employee-header" class="flex-1 bg-blue-500 text-white text-base p-3">
        <h2>${employee.name}</h2>
        <h2><i class="fas ${employee.getIcon()}"></i> ${employee.getRole()}</h2>
    </div>
    <div id="employee-body" class="p-3 bg-gray-200 py-7 px-5">
      <div class="flex flex-col bg-white">
        <div class=" border border-gray-300 p-2" >ID: ${employee.id}</div>
        <div class=" border border-gray-300 p-2" >Email:<a href="mailto:${employee.email}">${employee.email}</a></div>
        <div class=" border border-gray-300 p-2" >`

        if (employee instanceof Manager) {
          employeeGenerate += `Office number : ${employee.officeNumber}`

        }else if(employee instanceof Engineer) {
          employeeGenerate += `GitHub : ${employee.getGithub()}`
        }else if(employee instanceof Intern) {
          employeeGenerate += `School : ${employee.getSchool()}`
        }

        employeeGenerate += `</div>
      </div>
    </div>
  </div>
</div>
 `
 generateHTMLTemplate += employeeGenerate
    
  })
  generateHTMLTemplate+= `</section>
      
  </body>
  </html>
  `

  fs.writeFile('index.html',generateHTMLTemplate, error => console.log(error))
}

main()
