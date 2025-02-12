import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import "./SimpleTodoApp.css";
import axios from "axios";

const SimpleTodoApp: React.FC = () => {
  const [todo, setTodo] = useState<string>(""); 
  const [todos, setTodos] = useState<string[]>([]);
  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editTodo, setEditTodo] = useState<string>("");
  const [checkboxes, setCheckboxes] = useState<boolean[]>([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/todos");
      setTodos(response.data);
      setCheckboxes(response.data.map((item:any) => item.completed || false));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    fetchTodos();
  },[])

  const addClickHandle = async () => {
    if (todo.trim() === "") return alert("Please fill the input field.");
    try {
      await axios.post(
        "http://localhost:5000/api/todos",
       {title: todo}
      );
      setTodos((prev:any) => [...prev, { title: todo }]);
      setCheckboxes((prev) => [...prev, false]); // Add a default unchecked state
      setTodo("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandle = async (index: number) => {
    console.log(index,'index')
    try {
      await axios.delete(`http://localhost:5000/api/todos/${index}`);
      setTodos((prev) => prev.filter((a:any) => a.id !== index));
      setCheckboxes((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.log(error);
    }
  };

  const editHandle = (index: number) => {
    setEditing(true);
    setEditIndex(index);
    const todoToEdit:any = todos.find((item: any) => item.id === index);
    setEditTodo(todoToEdit?.title || "");
  };

  const updateClickHandle = () => {
    if (editTodo.trim() === "") return alert("Please fill the input field.");
    try {
      axios.put(`http://localhost:5000/api/todos/${editIndex}`, {
        title: editTodo,
      });
      setTodos((prev) =>
        prev.map((item: any) =>
          item.id === editIndex ? { ...item, title: editTodo } : item
        )
      );
      setEditing(false);
      setEditIndex(null);
      setEditTodo("");
    } catch (error) {
      console.log(error);
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
        {todos.map((item:any, i) => (
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
              <span>{item.title.toLocaleUpperCase()}</span>
            </div>
            <div className="todo-actions">
              <button onClick={() => editHandle(item.id)} className="edit-button">
                <FaEdit />
              </button>
              <button onClick={() => deleteHandle(item.id)} className="delete-button">
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
