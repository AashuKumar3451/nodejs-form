const express = require("express");
const router = express.Router();
const person = require("./../models/person");
const {jwtMiddleware} = require("./../jwt");
const path = require("path");
router.get("/data",(req,res)=>{
  res.status(200).sendFile(path.join(__dirname, "../public","profilePage.html"));
});
router.get("/", jwtMiddleware, async(req,res) => {
    try{
        const userData = req.userPayload;
        const user = await person.findById(userData.id);
        res.status(200).json({user: user});
    }catch(err){
      res.status(500).send("Error occured");
    }

});

module.exports = router;