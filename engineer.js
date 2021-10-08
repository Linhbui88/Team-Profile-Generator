const Employee = require('./employee')
const inquirer = require('inquirer')
class Engineer extends Employee {
  constructor(role, name, id, email, github) {
    super(role, name, id, email)
    this.github= github
  }
  getGithub() {
    console.log(`Github user name link: ${this.github}`)
  }
  getRole() {
    console.log(`${this.role}`)
  }
}

// var engineerQuestions =
// inquirer 
// .prompt([
//   {
//     type:'input',
//     name: 'github',
//     message :'What is employee Github Username?'

//   }
// ])
// .then(answers => {
//   const {github} =answers
//   console.log(github)
// })


module.exports = Engineer