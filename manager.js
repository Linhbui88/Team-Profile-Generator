const Employee = require('./employee')
// const inquirer = require('inquirer')

class Manager extends Employee {
  constructor(role,name, id, email, officeNumber) {
    super(role, name, id, email)
    this.officeNumber= officeNumber
  }
  getRole() {
    console.log(`${this.role}`)
  }
}



module.exports = Manager
 