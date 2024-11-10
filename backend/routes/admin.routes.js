const express = require('express');
const {loginAdmin, createTask} = require('../controllers/admin.controllers.js');

const router = express.Router();

router.route('/login').post(loginAdmin);
router.route('/create-task').post(createTask);

module.exports = router;