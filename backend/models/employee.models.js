const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const employeeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: false,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    taskCount: [
        {
            active: {
                type: Number,
                default: 0
            },
            newTask: {
                type: Number,
                default: 0
            },
            completed: {
                type: Number,
                default: 0
            },
            failed: {
                type: Number,
                default: 0
            }
        }
    ],
    tasks: [
        {
            active: {
                type: Boolean,
                default: true
            },
            newTask: {
                type: Boolean,
                default: true
            },
            completed: {
                type: Boolean,
                default: false
            },
            failed: {
                type: Boolean,
                default: false
            },
            taskTitle: {
                type: String,
                required: true
            },
            taskDescription: {
                type: String,
                required: true
            },
            taskDate: {
                type: String,
                required: true,
                match: /^\d{4}-\d{2}-\d{2}$/
            },
            category: {
                type: String,
                required: true
            }
        }
    ],
}, {
    timestamps: true
})

employeeSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

employeeSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}


const Employee = mongoose.model("Employee", employeeSchema)
module.exports = Employee