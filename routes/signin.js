const express = require("express");
const router = express.Router();
const path = require("path");
const person = require("./../models/person");
const {jwtMiddleware,generateJWT} = require("./../jwt");

router.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../public/signin.html"));
});
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const user = await person.findOne({ email: data.email });
    if (!user || !(await user.comparePass(data.password))) {
      return res.status(400).json("Email or Password is incorrect");
    }
    const payload = {
        id: user.id,
        email: user.email}
    const token = generateJWT(payload);
    res.status(200).json({ user: user, token: token });
  } catch (error) {
    console.log("Error Occured", error);
    res.status(401).send("Error Occured", error);
  }
});



module.exports = router;
