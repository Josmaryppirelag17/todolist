import React, { useState } from "react";
import "./ToDoList.css";
import AnimatedBackground from "./AnimatedBackground";

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    text: "",
    description: "",
    createdAt: new Date().toISOString(),
    dueDate: "",
    color: "#ffffff",
    tags: [],
    completed: false,
    completedAt: null
  });
  const [newTag, setNewTag] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all, pending, completed

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.text.trim() !== "") {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          ...newTodo,
          createdAt: new Date().toISOString() // Aseguramos que la fecha de creación sea el momento exacto
        }
      ]);
      setNewTodo({
        text: "",
        description: "",
        createdAt: new Date().toISOString(),
        dueDate: "",
        color: "#ffffff",
        tags: [],
        completed: false,
        completedAt: null
      });
    }
  };

  const handleTagInput = (e) => {
    if (e.key === "Enter" && newTag.trim() !== "") {
      if (!newTodo.tags.includes(newTag.trim())) {
        setNewTodo({
          ...newTodo,
          tags: [...newTodo.tags, newTag.trim()]
        });
      }
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setNewTodo({
      ...newTodo,
      tags: newTodo.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completedAt: !todo.completed ? new Date().toISOString() : null
            }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos
    .filter(todo => {
      if (filterStatus === "pending") return !todo.completed;
      if (filterStatus === "completed") return todo.completed;
      return true;
    })
    .filter(todo => !filterTag || todo.tags.includes(filterTag));

  const getAllTags = () => {
    const tagSet = new Set();
    todos.forEach(todo => {
      todo.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <AnimatedBackground />
      <div className="todo-container">
        <h1>Lista de Tareas</h1>

        <form onSubmit={handleAddTodo} className="todo-form">
          <div className="form-group">
            <input
              type="text"
              value={newTodo.text}
              onChange={(e) => setNewTodo({...newTodo, text: e.target.value})}
              placeholder="Título de la tarea..."
              className="todo-input"
              required
            />
            <textarea
              value={newTodo.description}
              onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
              placeholder="Descripción de la tarea..."
              className="todo-description"
            />
            <div className="form-row">
              <div className="date-input-group">
                <label>Fecha límite</label>
                <input
                  type="datetime-local"
                  value={newTodo.dueDate}
                  onChange={(e) => setNewTodo({...newTodo, dueDate: e.target.value})}
                  className="todo-date"
                />
              </div>
              <div className="color-input-group">
                <label>Color</label>
                <input
                  type="color"
                  value={newTodo.color}
                  onChange={(e) => setNewTodo({...newTodo, color: e.target.value})}
                  className="todo-color"
                />
              </div>
            </div>
            <div className="tags-input">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleTagInput}
                placeholder="Presiona Enter para agregar un tag"
                className="tag-input"
              />
              <div className="tags-container">
                {newTodo.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="tag-remove"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <button type="submit" className="add-button">
            Agregar
          </button>
        </form>

        <div className="filters-section">
          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="tag-filter"
          >
            <option value="">Todos los tags</option>
            {getAllTags().map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="status-filter"
          >
            <option value="all">Todas las tareas</option>
            <option value="pending">Pendientes</option>
            <option value="completed">Completadas</option>
          </select>
        </div>

        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              <div className="todo-item-content">
                <div className="todo-checkbox">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    id={`todo-${todo.id}`}
                  />
                  <label htmlFor={`todo-${todo.id}`} className="checkbox-label"></label>
                </div>

                <h3 className="todo-title">{todo.text}</h3>

                {todo.description && (
                  <p className="todo-description-text">{todo.description}</p>
                )}

                <div className="todo-dates">
                  <span className="created-date">
                    Creada: {formatDate(todo.createdAt)}
                  </span>
                  {todo.dueDate && (
                    <span className="due-date">
                      Vence: {formatDate(todo.dueDate)}
                    </span>
                  )}
                  {todo.completed && (
                    <span className="completed-date">
                      Completada: {formatDate(todo.completedAt)}
                    </span>
                  )}
                </div>

                {todo.tags.length > 0 && (
                  <div className="todo-tags">
                    {todo.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="delete-button"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ToDoList;
