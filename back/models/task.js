const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: { type: String, default: null },
    description: { type: String, default: null },
    assigned: { type: String, default: null },
    status: { type: String, default: null },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    },
})

module.exports = mongoose.model("Tasks", taskSchema);
