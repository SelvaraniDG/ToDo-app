const express = require('express');
const connectDB = require('./db.js');
const Todo = require('./models/Todo.js')
const cors = require('cors');


const app = express()
app.use(express.json())
app.use(cors())
connectDB();

// app.get('/', async (req, res) =>{
//   const Todo = await Todo.find()
//   res.json(Todo)
// })

app.post('/add', async (req, res) => {
  try {
    const { task } = req.body;
    const newTask = await Todo.create({ task });
    res.json(newTask);
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ error: 'Failed to add task' });
  }
});


app.listen(3001, () => {
  console.log("server is running");
})