import React, { useState } from "react";
import { Box, IconButton, Typography, TextField } from "@mui/material";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

interface Todo {
  parentId?: string;
  _id: string;
  todo: string;
  status: boolean;
  nestedTodos?: Todo[];
}

interface TodoItemProps {
  todo: Todo;
  // todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  // createNestedTodo: (parentTodoId: string, nestedContent: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, setTodos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo.todo);
  const [nestedContent, setNestedContent] = useState("");
  const [showNestedTextField, setShowNestedTextField] = useState(false);

  
  

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
      setTodos((currentTodos) => {
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
        method: "PUT",
        body: JSON.stringify({ todo: editedTodo }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      if (json.updatedTodo) {
        setTodos((prevTodos) =>
          prevTodos.map((prevTodo) =>
            prevTodo._id === todo._id
              ? { ...prevTodo, todo: editedTodo }
              : prevTodo
          )
        );
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    } finally {
      setIsEditing(false); // Toggle editing mode off
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTodo(todo.todo); // Reset editedTodo to original value
  };

  const createNewNestedTodo = async (_id: string, nestedContent: string) => {
    if (nestedContent.trim() !== "") {
      try {
        const res = await fetch(`/api/nestedTodos`, {
          method: "POST",
          body: JSON.stringify({ todo: nestedContent, parent_id: todo._id }), // Passing parent_id to the API here
          headers: {
            "Content-Type": "application/json",
          },
        });
        const newNestedTodo: Todo = await res.json();
        setTodos((prevTodos) =>
          prevTodos.map((prevTodo) =>
            prevTodo._id === todo._id
              ? {
                  ...prevTodo,
                  nestedTodos: [...(prevTodo.nestedTodos || []), newNestedTodo],
                }
              : prevTodo
          )
        );
        setNestedContent("");
      } catch (error) {
        console.error("Error creating nested todo:", error);
      }
    }
  };

  const handleCreateNestedTodo = () => {
    setShowNestedTextField(true); // for showing the text field for adding nested todo
  };

  // Function to handle adding the nested todo
  const addNestedTodo = async () => {
    if (nestedContent.trim() !== "") {
      createNewNestedTodo(todo._id, nestedContent);
      setNestedContent(""); // Reset the text field
      setShowNestedTextField(false); // Hide the text field
    }
  };

  //Nestedtodo rendering
  const renderNestedTodos = () => {
    return todo.nestedTodos?.map((nestedTodo: any) => (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <ArrowRightIcon
          sx={{
            color: "white",
            fontSize: 50,
            marginLeft: "20px",
            marginBottom: "10px",
          }}
        />
        <Box
          key={nestedTodo._id}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "8px",
            borderRadius: "20px",
            marginBottom: "10px",
            paddingLeft: "20px",
            width: "100%",
          }}
        >
          <IconButton
            color="inherit"
            onClick={() => updateTodo(nestedTodo._id, nestedTodo.status)}
          >
            {nestedTodo.status ? (
              <CheckBoxOutlinedIcon />
            ) : (
              <CheckBoxOutlineBlankOutlinedIcon />
            )}
          </IconButton>
          {isEditing ? (
            <TextField
              fullWidth
              value={editedTodo}
              onChange={(e) => setEditedTodo(e.target.value)}
              sx={{
                flexGrow: 1,
                marginLeft: "8px",
                textDecoration: todo.status ? "line-through" : "none",
              }}
            />
          ) : (
            <Typography
              sx={{
                flex: 1,
                marginLeft: "8px",
                textDecoration: todo.status ? "line-through" : "none",
              }}
            >
              {nestedTodo.todo}
            </Typography>
          )}
          {/* Action Buttons */}
          <Box sx={{ display: "flex" }}>
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
              <IconButton color="inherit" onClick={handleEdit}>
                <EditOutlinedIcon />
              </IconButton>
            )}

            <IconButton
              color="inherit"
              onClick={() => deleteTodo(nestedTodo._id)}
            >
              <DeleteOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    ));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // Ensure todos and nested todos are displayed vertically
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          color: "black",
          padding: "8px",
          borderRadius: "20px",
          marginBottom: "10px",
        }}
      >
        {/* Parent Todo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            color="inherit"
            onClick={() => updateTodo(todo._id, todo.status)}
          >
            {todo.status ? (
              <CheckBoxOutlinedIcon />
            ) : (
              <CheckBoxOutlineBlankOutlinedIcon />
            )}
          </IconButton>
          {isEditing ? (
            <TextField
              fullWidth
              value={editedTodo}
              onChange={(e) => setEditedTodo(e.target.value)}
              sx={{
                flexGrow: 1,
                marginLeft: "8px",
                textDecoration: todo.status ? "line-through" : "none",
              }}
            />
          ) : (
            <Typography
              sx={{
                flex: 1,
                marginLeft: "8px",
                textDecoration: todo.status ? "line-through" : "none",
              }}
            >
              {todo.todo}
            </Typography>
          )}
          {/* Action Buttons */}
          <Box sx={{ display: "flex" }}>
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
              <IconButton color="inherit" onClick={handleEdit}>
                <EditOutlinedIcon />
              </IconButton>
            )}
            <IconButton color="inherit" onClick={() => deleteTodo(todo._id)}>
              <DeleteOutlinedIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleCreateNestedTodo}>
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {showNestedTextField && (
        <Box sx={{ display: "flex" }}>
          <ArrowRightIcon
            sx={{ color: "white", fontSize: 50, marginLeft: "20px" }}
          />
          <TextField
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "right",
                  justifyContent: "right",
                  marginBottom: "10px",
                }}
              >
                Nested Todo...
              </Box>
            }
            margin="none"
            type="text"
            InputLabelProps={{ style: { color: "black" } }}
            InputProps={{
              style: {
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                color: "black",
              },
              endAdornment: (
                <IconButton color="inherit" onClick={addNestedTodo}>
                  <AddIcon />
                </IconButton>
              ),
            }}
            sx={{
              flexGrow: 1,
              width: "100%",
              "& .MuiInputBase-root": {
                borderRadius: "20px",
                border: "none",
                marginBottom: "8px",
                // marginLeft: "60px",
              },
            }}
            value={nestedContent}
            onChange={(e) => setNestedContent(e.target.value)}
          />
        </Box>
      )}
      {renderNestedTodos()}
    </>
  );
};

export default TodoItem;
