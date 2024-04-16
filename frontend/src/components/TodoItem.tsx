import React, { useState } from 'react';
import { Box, IconButton, Typography, TextField } from '@mui/material';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';


interface Todo {
  _id: string;
  todo: string;
  status: boolean;
  nestedTodos?: Todo[];
}

interface TodoItemProps {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  createNestedTodo: (parentTodoId: string, nestedContent: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, setTodos, createNestedTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo.todo);
  const [nestedContent, setNestedContent] = useState('')


  // FOR UPDATING THE TODO IF USING ITS ID AND THE STATUS.
  const updateTodo = async (todoId: string, todoStatus: boolean) => {
    const res = await fetch(`/api/todos/${todoId}`, {
      method: "PUT",
      body: JSON.stringify({ status: todoStatus }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const json = await res.json();
    if (json.acknowledged) {
      setTodos(currentTodos => {
        return currentTodos.map((currentTodo) => {
          if (currentTodo._id === todoId) {
            return { ...currentTodo, status: !currentTodo.status };
          }
          return currentTodo;
        });
      });
    }
  };

  const deleteTodo = async (todoId: string) => {
    const res = await fetch(`/api/todos/${todoId}`, {
      method: "DELETE",
    });
    const json = await res.json();
    if (json.acknowledged) {
      setTodos((currentTodos) => {
        return currentTodos.filter(
          (currentTodos) => currentTodos._id !== todoId
        );
      });
    }
  };


  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      const res = await fetch(`/api/editTodos/${todo._id}`, {
        method: 'PUT',
        body: JSON.stringify({ todo: editedTodo }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await res.json();
      if (json.updatedTodo) {
        setTodos((prevTodos) =>
          prevTodos.map((prevTodo) =>
            prevTodo._id === todo._id ? { ...prevTodo, todo: editedTodo } : prevTodo
          )
        );
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    } finally {
      setIsEditing(false); // Toggle editing mode off
    }
  };


  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTodo(todo.todo); // Reset editedTodo to original value
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        color: 'black',
        padding: '8px',
        borderRadius: '20px',
        marginBottom: '10px',
      }}
    >
      <IconButton color='inherit' onClick={() => updateTodo(todo._id, todo.status)}>
        {todo.status ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />}
      </IconButton>
      {isEditing ? (
        <TextField
          value={editedTodo}
          onChange={(e) => setEditedTodo(e.target.value)}
        />
      ) : (
        <Typography
          sx={{
            flex: 1,
            marginLeft: '8px',
            textDecoration: todo.status ? 'line-through' : 'none',
          }}
        >
          {todo.todo}
        </Typography>
      )}
      <Box sx={{ display: 'flex' }}>
        {isEditing ? (
          <>
            <IconButton onClick={handleSaveEdit}>
              <CheckIcon />
            </IconButton>
            <IconButton onClick={handleCancelEdit}>
              <CancelIcon />
            </IconButton>
          </>
        ) : (
          <IconButton color='inherit' onClick={handleEdit}>
            <EditOutlinedIcon />
          </IconButton>
        )}
        <IconButton color='inherit' onClick={() => deleteTodo(todo._id)}>
          <DeleteOutlinedIcon />
        </IconButton>
        <IconButton color='inherit' onClick={() => createNestedTodo(todo._id, nestedContent)}>
          <AddIcon />
        </IconButton>
      </Box>
      {todo.nestedTodos && (
        <Box sx={{ marginLeft: '48px' }}>
          {todo.nestedTodos.map(nestedTodo => (
            <Box
              key={nestedTodo._id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#FFC0CB', //pink
                color: 'red',
                padding: '8px',
                borderRadius: '20px',
                marginBottom: '10px',
                marginLeft: '24px',
              }}
            >
              <IconButton color='inherit' onClick={() => updateTodo(nestedTodo._id, nestedTodo.status)}>
                {nestedTodo.status ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />}
              </IconButton>
              <Typography
                sx={{
                  flex: 1,
                  marginLeft: '8px',
                  textDecoration: nestedTodo.status ? 'line-through' : 'none',
                }}
              >
                {nestedTodo.todo}
              </Typography>
              <IconButton color='inherit' onClick={() => deleteTodo(nestedTodo._id)}>
                <DeleteOutlinedIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TodoItem;
