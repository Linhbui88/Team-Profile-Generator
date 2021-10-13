const Employee = require('./employee')

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email)
    this.officeNumber= officeNumber
  }
  getRole() {
    return 'Manager'
  }
  getIcon() {
    return 'fa-mug-hot'
  }
}



module.exports = Manager
 