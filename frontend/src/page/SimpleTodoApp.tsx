import React, { useState } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import "./SimpleTodoApp.css";

const SimpleTodoApp: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);
  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editTodo, setEditTodo] = useState<string>("");
  const [checkboxes, setCheckboxes] = useState<boolean[]>([]);

  const addClickHandle = () => {
    if (todo.trim() === "") return alert("Please fill the input field.");
    setTodos((prev) => [...prev, todo]);
    setCheckboxes((prev) => [...prev, false]); // Add a default unchecked state
    setTodo("");
  };

  const deleteHandle = (index: number) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
    setCheckboxes((prev) => prev.filter((_, i) => i !== index));
  };

  const editHandle = (index: number) => {
    setEditing(true);
    setEditIndex(index);
    setEditTodo(todos[index]);
  };

  const updateClickHandle = () => {
    if (editTodo.trim() === "") return alert("Please fill the input field.");
    if (editIndex !== null) {
      setTodos((prev) =>
        prev.map((item, i) => (i === editIndex ? editTodo : item))
      );
      setEditing(false);
      setEditIndex(null);
      setEditTodo("");
    }
  };

  const toggleCheckbox = (index: number) => {
    setCheckboxes((prev) =>
      prev.map((checked, i) => (i === index ? !checked : checked))
    );
  };

  return (
    <div className="todo-app">
      <h1>Simple Todo App</h1>
      <div className="todo-input">
        {editing ? (
          <>
            <input
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditTodo(e.target.value)
              }
              value={editTodo.toLocaleUpperCase()}
              name="edit"
            />
            <button onClick={updateClickHandle} className="add-button">
              <FaEdit /> Update
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTodo(e.target.value)
              }
              value={todo.toLocaleUpperCase()}
              name="todo"
              placeholder="Add a new task"
            />
            <button onClick={addClickHandle} className="add-button">
              <FaPlus /> Add
            </button>
          </>
        )}
      </div>
      <ul className="todo-list">
        {todos.map((item, i) => (
          <li
            key={i}
            className={`todo-item ${checkboxes[i] ? "bg-dim" : "bg-white"}`}
          >
            <div className="todo-content">
              <input
                onChange={() => toggleCheckbox(i)}
                type="checkbox"
                checked={checkboxes[i]}
              />
              <span>{item.toLocaleUpperCase()}</span>
            </div>
            <div className="todo-actions">
              <button onClick={() => editHandle(i)} className="edit-button">
                <FaEdit />
              </button>
              <button onClick={() => deleteHandle(i)} className="delete-button">
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SimpleTodoApp;
