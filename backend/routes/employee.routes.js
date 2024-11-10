const express = require('express');
const { registerEmployee, loginEmployee, findEmployee, getAllEmployees, acceptTask, completedTask, failedTask } = require('../controllers/employee.controllers.js');

const router = express.Router();

router.route('/register').post(registerEmployee);
router.route('/login').post(loginEmployee);
router.route('/find:employeeId').get(findEmployee);
router.route('/employees').get(getAllEmployees);
router.route('/acceptTask').post(acceptTask);
router.route('/failedTask').post(failedTask);
router.route('/completedTask').post(completedTask);

module.exports = router;
