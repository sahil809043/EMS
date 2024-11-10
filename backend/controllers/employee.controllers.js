const Employee = require('../models/employee.models.js');
const mongoose = require('mongoose');
const asyncHandler = require('../utils/asyncHandler.js');


const registerEmployee = asyncHandler(async (req, res) => {

    const { username, email, password, confirmPassword } = req.body;

    if ([email, username, password, confirmPassword].some(field => !field.trim())) {
        return res.status(400).json({ error: true, message: "Please fill all the credentials" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: true, message: "both the password fields should be same" });
    }

    try {
        const existingUser = await Employee.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: true, message: "Employee already exist" });
        }

        const newUser = await Employee.create({
            email,
            password,
            username: username.toLowerCase(),
            taskCount: [
                { active: 0, newTask: 0, completed: 0, failed: 0 }
            ]
        });

        return res.status(201).json({
            error: false,
            Employee: { ...newUser.toObject() }
        });
    } catch (error) {
        console.error('Error in registerUser:', error);
        return res.status(500).json({ error: true, message: "Server error. Please try again later" });
    }
});

const loginEmployee = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email.trim() || !password.trim()) {
        return res.status(400).json({ error: true, message: "Please provide both email and password" });
    }

    try {
        const employee = await Employee.findOne({ email });

        if (!employee) {
            return res.status(401).json({ error: true, message: "Invalid email or password" });
        }

        const isPasswordValid = await employee.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: true, message: "Invalid email or password" });
        }

        return res.status(200).json({
            error: false,
            Employee: { ...employee.toObject() }
        });
    } catch (error) {
        console.error('Error in loginUser:', error);
        return res.status(500).json({ error: true, message: "Server error. Please try again later" });
    }
});

const findEmployee = asyncHandler(async (req, res) => {
    const employeeId = req.params.employeeId;

    const employee = await Employee.findById(employeeId);

    return res.status(200)
        .json(employee);
});

const getAllEmployees = asyncHandler(async (req, res) => {
    const employees = await Employee.find();

    return res.status(200)
        .json(employees)
});

const acceptTask = asyncHandler(async (req, res) => {
    const { employeeId, taskId } = req.body;

    try {
        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({ error: true, message: "Employee not found" });
        }

        const taskIndex = employee.tasks.findIndex(task => task._id.toString() === taskId);
        if (taskIndex === -1) {
            return res.status(404).json({ error: true, message: "Task not found" });
        }

        employee.tasks[taskIndex].active = true;
        employee.tasks[taskIndex].newTask = false;
        employee.taskCount[0].active++;
        employee.taskCount[0].newTask--;
        await employee.save();

        return res.status(200).json({
            error: false,
            Employee: {
                _id: employee._id,
                username: employee.username,
                taskCount: employee.taskCount
            }
        })
    } catch (error) {
        return res.status(500).json({ error: true, message: error });
    }
})

const completedTask = asyncHandler(async (req, res) => {
    const { employeeId, taskId } = req.body;

    try {
        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({ error: true, message: "Employee not found" });
        }

        const taskIndex = employee.tasks.findIndex(task => task._id.toString() === taskId);
        console.log(taskIndex)
        if (taskIndex === -1) {
            return res.status(404).json({ error: true, message: "Task not found" });
        }

        employee.tasks[taskIndex].active = false;
        employee.tasks[taskIndex].completed = true;
        employee.taskCount[0].active--;
        employee.taskCount[0].completed++;
        await employee.save();

        return res.status(200).json({
            error: false,
            Employee: {
                _id: employee._id,
                username: employee.username,
                taskCount: employee.taskCount
            }
        })
    } catch (error) {
        return res.status(500).json({ error: true, message: error });
    }
})

const failedTask = asyncHandler(async (req, res) => {
    const { employeeId, taskId } = req.body;

    try {
        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({ error: true, message: "Employee not found" });
        }

        const taskIndex = employee.tasks.findIndex(task => task._id.toString() === taskId);
        if (taskIndex === -1) {
            return res.status(404).json({ error: true, message: "Task not found" });
        }

        employee.tasks[taskIndex].active = false;
        employee.tasks[taskIndex].failed = true;
        employee.taskCount[0].active--;
        employee.taskCount[0].failed++;
        await employee.save();

        return res.status(200).json({
            error: false,
            Employee: {
                _id: employee._id,
                username: employee.username,
                taskCount: employee.taskCount
            }
        })
    } catch (error) {
        return res.status(500).json({ error: true, message: error });
    }
})


module.exports = {
    registerEmployee,
    loginEmployee,
    findEmployee,
    getAllEmployees,
    acceptTask,
    completedTask,
    failedTask
};
