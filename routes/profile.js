const express = require("express");
const router = express.Router();
const person = require("./../models/person");
const {jwtMiddleware} = require("./../jwt");

router.get("/", jwtMiddleware, async(req,res) => {
    try{
        const userData = req.userPayload;
        console.log(userData);
        const user = await person.findById(userData.id);
        console.log(user);
        res.status(200).json({user: user});
    }catch(err){
      res.status(500).send("Error occured");
    }

});

module.exports = router;