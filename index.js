const express = require('express');
const path = require("path");
const bodyParser = require("body-parser");
require('dotenv').config();
const db = require("./db");
const app = express();

app.use(bodyParser.json());

// Routes Paths
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));    //Using static frontend files
const signupRoutes = require("./routes/signup");
const signinRoutes = require("./routes/signin");
const profileRoutes = require("./routes/profile");


// Endpoints
app.get("/", (req,res)=>{
    res.status(200).sendFile(path.join(__dirname, 'public',"index.html"));
})
app.use("/signup", signupRoutes);
app.use("/signin", signinRoutes);
app.use("/profile", profileRoutes);


PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("Server running at port number: ", PORT);
});