// Require and call Express
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Use css
app.use(express.static("public"));

// placeholder tasks
const task = [];
const complete = [];

// add a task
app.post("/addtask", function(req, res) {
  const newTask = req.body.newtask;
  task.push(newTask);
  res.status(200).redirect("/");
});

// remove a task
app.post("/removetask", function(req, res) {
  const completeTask = req.body.check;
  if (typeof completeTask === "string") {
    complete.push(completeTask);
    task.splice(task.indexOf(completeTask), 1);
  }
  else if (typeof completeTask === "object") {
    for (var i = 0; i < completeTask.length; i++) {
      complete.push(completeTask[i]);
      task.splice(task.indexOf(completeTask[i]), 1);
    }
  }
  res.redirect("/");
});

// get website files
app.get("/", function (req, res) {
  res.status(200).render("index", { task: task, complete: complete });
});

module.exports = app;
