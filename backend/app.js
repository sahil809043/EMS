const cors = require('cors');
const express = require('express');
const employeeRoutes = require('./routes/employee.routes.js');
const adminRoutes = require('./routes/admin.routes.js');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static("public"));

app.use("/api/v1/employee", employeeRoutes);
app.use("/api/v1/admin", adminRoutes);

app.get('/', (req, res) => {
    res.send('This is a application');
});

module.exports = app;
