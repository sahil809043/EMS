const Employee = require('../models/employee.models.js');
const asyncHandler = require('../utils/asyncHandler.js');

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: true, message: "Please provide email and password" });
        }

        if (email !== 'admin@ems.com' || password !== 'adminems9000') {
            return res.status(401).json({ error: true, message: "Invalid credentials" });
        }

        return res.status(200).json({ success: true, message: "Admin logged in successfully" });
    } catch (error) {
        return res.status(500).message(error.message);
    }
})

const createTask = asyncHandler(async (req, res) => {
    const { taskTitle, taskDescription, taskDate, assignTo, category } = req.body;
    console.log(taskTitle, taskDescription, taskDate, assignTo, category);

    try {
        const employee = await Employee.findOne({
            username: req.body.assignTo
        })

        if (!employee) {
            return res.status(400).json({ error: true, message: "no such employee found" });
        }

        employee.tasks.push({ taskTitle, taskDescription, taskDate, category, active: false, newTask: true, failed: false, completed: false });
        employee.taskCount[0].newTask = employee.taskCount[0].newTask + 1;
        await employee.save();

        return res.status(200).json({
            success: true,
            message: "task created successfully"
        })
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
})

module.exports = {
    loginAdmin,
    createTask
};