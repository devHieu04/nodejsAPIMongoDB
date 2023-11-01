const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/studentdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: String
});

const Student = mongoose.model('Student', studentSchema);

app.use(express.json());

app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/students', async (req, res) => {
  const student = new Student({
    name: req.body.name,
    age: req.body.age,
    address: req.body.address
  });
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/students/:name', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.name, req.body);
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndRemove(req.params.id);
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
