require("dotenv").config();
const mongoose = require("mongoose");
const app = require('./app');

(async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        const expressServer = app.listen(process.env.PORT, () => {
            console.log(`Database is successfully connected and application is running at port number ${process.env.PORT}`);
        });

    } catch (error) {
        console.error(`Error at database connection: ${error}`);
        process.exit(1);
    }
})();