const Task = require("../models/task");

exports.createTask = async (req, res) => {
const data = req.body;
    const taskData = {
        title: data.title,
        description: data.description,
        assigned: data.assigned,
        status: data.status,
        createdAt: data.createdAt,
    };

    const task = new Task(taskData);
    await task.save()
        .then((task) => {
            res.status(200).json(task);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Error creating task" });
        })
}

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            data: null
        })
    }
}