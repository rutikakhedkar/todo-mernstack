const express = require("express");
const Task = require('../models/task-model');

// Controller for adding a new task
const addTask = async (req, res) => {
  try {
    const { taskName, labels } = req.body;

    const storeTask = await Task.create({
      taskName: taskName,
      priority: labels    });

    if (storeTask) {
      return res.status(200).send({ message: storeTask });
    } else {
      return res.status(400).send({ message: "Something went wrong" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Server error", error: error.message });
  }
};

// Controller for getting all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    return res.status(200).send({ tasks: tasks });
  } catch (error) {
    return res.status(500).send({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addTask,
  getTasks
};
