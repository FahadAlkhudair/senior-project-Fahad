const express = require("express");
const cors = require("cors");
const config = require("./config");
const db = require('./models');
const seeder = require('./seeder');
const cronJobs = require('./cron-jobs');

// Routes
const authRoute = require('./routes/auth.routes');
const testRoute = require('./routes/test.routes');
const userRoute = require('./routes/user.routes');
const bloodRoute = require('./routes/blood-component.routes');
const donationRoute = require('./routes/donation.routes');
const staffRoute = require('./routes/staff.route');

const app = express();

// Configure CORS
app.use(cors(config.cors));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Online Blood Management System." });
});

// Routes
authRoute(app);
userRoute(app);
bloodRoute(app);
donationRoute(app);
staffRoute(app);
testRoute(app);

// Configure Mongoose
db.mongoose.connect(config.mongoDBConectionString, { useNewUrlParser: true, useUnifiedTopology: true })
const conn = db.mongoose.connection;

conn.on("error", (err) => { 
    console.error(err); 
    process.exit(); 
});

conn.once("open", async () => {
    console.log("Connection to Database successfully");
    
    // Seed Database
    await seeder.seedDb().then(() => {
        console.log("Database sucessfully seeded!");
    });
});

// Add Scheduled Jobs
cronJobs.initScheduledJobs();

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});