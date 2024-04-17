import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, createTheme, ThemeProvider, Box, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import TaskRoundedIcon from '@mui/icons-material/TaskRounded';
import TodoItem from './TodoItem';


interface Todo {
  _id: string;
  todo: string;
  status: boolean;
  nestedTodos?: Todo[];
  parentId?: string;
}

const HomePage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [content, setContent] = useState("");
  const [nestedContent, setNestedContent] = useState("");

  useEffect(() => {
    async function getTodos() {
      const res = await fetch('/api/todos');
      const todos = await res.json();
      setTodos(todos);
    }
    getTodos();
  }, [todos]);



   //FOR CREATING A NEW TODO 
  const createNewTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content.length > 3) {
      const res = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ todo: content }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newTodo: Todo = await res.json(); 
      setContent('');
      setTodos([...todos, newTodo]);
    }
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
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h5" component="div" fontWeight="bold">
            TO-DO APP
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5" component="div" sx={{ marginRight: 2 }}>
              Home
            </Typography>
            <Typography
              variant="h5"
              component="div"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Link to="/" style={{ color: "black", textDecoration: "none" }}>
                Logout
              </Link>
              <AccountCircleIcon
                sx={{ marginLeft: "36px", fontSize: "32px" }}
              />
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <form onSubmit={createNewTodo}>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={700}
          alignItems="center"
          justifyContent={"center"}
          margin={4}
          marginTop={10}
          padding={10}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          bgcolor="rgba(168, 218, 253, 0.8)"
          sx={{ margin: "0 auto" }}
        >
          <TextField
            fullWidth
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TaskRoundedIcon style={{ marginRight: 8 }} />
                Add your task here
              </Box>
            }
            margin="normal"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            InputLabelProps={{ style: { color: "black" } }}
            InputProps={{
              style: {
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                color: "black",
              },
              endAdornment: (
                <IconButton color="inherit" aria-label="add task" type="submit">
                  <AddIcon style={{ color: "black" }}/>
                </IconButton>
              ),
            }}
            sx={{
              flexGrow: 1,
              "& .MuiInputBase-root": {
                borderRadius: "20px",
                border: "none",
              },
            }}
          />
          <Box className="todo" sx={{ width: "100%", marginTop: 2 }}>
            {todos.map(todo => (
              <TodoItem
                key={todo._id}
                todo={todo}
                setTodos={setTodos} 
              />
            ))}
          </Box>
        </Box>
      </form>
    </ThemeProvider>
  );
}

export default HomePage;