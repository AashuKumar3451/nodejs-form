const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const router = express.Router();
const person = require("./../models/person");
const { generateJWT } = require("../jwt");

router.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../public/signup.html"));
});
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new person(data);
    const response = await newPerson.save();
    const payload = {
      id: response.id,
      email: response.email
    };
    const token = generateJWT(payload);
    if (!response) {
      res.status(401).json({ error: "Error occured while saving data" });
      return;
    }

    // Send a response
    res.status(200).json({ user: response, token: token });
  } catch (error) {
    console.log("Error Occured", error);
    res.status(401).send("Error Occured", error);
  }
});

module.exports = router;
