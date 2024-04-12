import React, { useState, ChangeEvent } from 'react';
import { AppBar, Toolbar, Typography, createTheme, ThemeProvider, Box, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ITask } from '../interfaces';
import TodoTask from './TodoTask';
import { Link } from 'react-router-dom';

const HomePage = () => {

    const [task, setTask] = useState<string>("")
    const [todo, setTodo] = useState<ITask[]>([]);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTask(event.target.value);
    }
    const addTask = () => {
      if(!task.trim()) {
        alert('Please add a valid task');
        return;
      }
        const newTask = {
            taskName: task
        }
        setTodo([...todo, newTask]);
        setTask("");
    }

    const completeTask = (taskNameToDelete:string) => {
        setTodo(todo.filter((task) =>{
            return task.taskName !== taskNameToDelete
        }))
    }


  const theme = createTheme({
    palette: {
      primary: {
        main: '#A8DAFD', // Light blue color
      },
    },
    typography: {
      fontFamily: 'Roboto, Montserrat', // Change font style here
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar>
      <Toolbar sx={{ justifyContent: 'space-between' }}> 
                    <Typography variant='h5' component='div' fontWeight='bold'>TO-DO APP</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant='h5' component='div' sx={{ marginRight: 2 }}>Home</Typography> 
                        <Typography variant='h5' component='div' sx={{ display: 'flex', alignItems: 'center' }}>
                           <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
                             Logout
                              </Link>
                              <AccountCircleIcon sx={{ marginLeft: '36px', fontSize: '32px'  }} />
                            </Typography>
                    </Box>
                </Toolbar>
      </AppBar>
      <form>
        <Box 
        display='flex' 
        flexDirection={'column'} 
        maxWidth={400} 
        alignItems='center' 
        justifyContent={'center'}
        margin={4}
        marginTop={10}
        padding={10}
        borderRadius={5}
        boxShadow={"5px 5px 10px #ccc"}
        bgcolor="rgba(168, 218, 253, 0.8)"
        sx={{ margin: '0 auto' }}
        >
        <TextField 
            label="Add your task here" 
            margin='normal' 
            type='text' 
            value={task}
            onChange={handleChange}
            InputLabelProps={{ style: { color: 'black' } }}
            InputProps={{ 
              style: { backgroundColor: 'rgba(255, 255, 255, 0.8)', color: 'black' }, 
              endAdornment: (
                <IconButton color="inherit" aria-label="add task" onClick={addTask}>
                  <AddIcon style={{ color: 'black' }} />
                </IconButton>
              )
            }}
            sx={{ flexGrow: 1 }}
          />
          <div className='todoList'>
    {todo.map((task: ITask, key: number) => (
        <TodoTask key={key} task={task} completeTask={completeTask} />
    ))}
</div>
        </Box>
        </form>
    </ThemeProvider>
  );
}

export default HomePage;
