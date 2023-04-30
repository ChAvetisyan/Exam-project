const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    role: {type: String, enum: ["admin", "user"]},
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    position: { type: String, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null },
    image: { type: String, default: null }
})

module.exports = mongoose.model("Users", userSchema);
