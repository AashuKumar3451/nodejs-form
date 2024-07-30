const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const personSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

personSchema.pre("save", async function(next){
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(this.password, salt);
    this.password = hashedPass;
    next();
  } catch (error) {
    console.log("Error Occured", error);
    res.status(401).send("Error Occured", error);
  }
});

personSchema.methods.comparePass = async function (candidatePass){
    try {
        const isMatch = bcrypt.compare(candidatePass, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

const person = mongoose.model("Persons", personSchema);
module.exports = person;
