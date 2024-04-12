import React, { useState } from 'react';
import { ITask } from '../interfaces';
import { Box, TextField, IconButton, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

interface Props{
  task: ITask;
  completeTask(taskNameToDelete:string): void;
}
// eslint-disable-next-line
const TodoTask = ({ task, completeTask }: Props) => {
  const [showAddTaskField, setShowAddTaskField] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');

  const HandleAddTaskClick = () => {
    setShowAddTaskField(true);
    axios.post('http://localhost:3001/add', { task: task.taskName })
      .then(result => console.log(result))
      .catch(err => console.log(err))
  };

  const addNewTask = () => {
    axios.post('http://localhost:3001/add', { task: newTaskName })
      .then(result => {
        console.log(result);
        // Optionally update the UI or perform any additional actions after successfully adding the task
      })
      .catch(err => console.log(err));
  };



  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="start"
      bgcolor="white"
      borderRadius={4}
      padding={1}
      marginBottom={1}
    >
      <Box display="flex" alignItems="center">
        <Checkbox />
        <TextField
          value={task.taskName}
          InputProps={{
            style: {
              color: 'black',
              border: 'none',
              outline: 'none',
              width: '100%',
            },
          }}
          InputLabelProps={{ style: { color: 'inherit' } }}
          disabled
        />
        <IconButton onClick={() => completeTask(task.taskName)}>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={HandleAddTaskClick}>
          <AddIcon />
        </IconButton>
      </Box>
      {showAddTaskField && (
        <Box display="flex" alignItems="center">
          <Checkbox />
          <TextField
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Add a new task"
            InputProps={{
              style: {
                color: 'black',
                border: 'none',
                outline: 'none',
                width: '100%',
              },
            }}
          />
          <IconButton onClick={() => completeTask(task.taskName)}>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={addNewTask}>
          <AddIcon />
        </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default TodoTask;