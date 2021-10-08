const Employee = require('./employee')
var inquirer = require('inquirer')

class Intern extends Employee {
  constructor(role, name, id, email, school) {
    super(role, name, id, email)
    this.school= school
  }
  getSchool() {
    console.log(`${this.school}`)
  }
}
// var internQuestions =
//   inquirer 
// .prompt([
//   {
//     type:'input',
//     name: 'school',
//     message :'Which school intern is attending?'

//   }
// ])
// .then(answers => {
//   const {school} =answers
//   console.log(school)
// })

module.exports =Intern
 


