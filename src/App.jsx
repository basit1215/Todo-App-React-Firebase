import React, { useState, useEffect } from "react";
import { db } from './firebase-config';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore"; 

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const todosCollection = collection(db, "todos");
      const todoSnapshot = await getDocs(todosCollection);
      const todoList = todoSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTodos(todoList);
    };
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (newTodo.trim() === "") {
      alert("Please enter a todo.");
      return;
    }
    const todosCollection = collection(db, "todos");
    await addDoc(todosCollection, { title: newTodo });
    setNewTodo(""); 
    fetchTodos(); 
  };
 
  const editTodo = async (id) => {
    const updatedTodo = prompt("Enter new Todo");

    if (updatedTodo === null || updatedTodo.trim() === "") {
      alert("Try Again!\nPlease enter a new edited todo");
      return;
    }
    
    const todoDoc = doc(db, "todos", id);
    await updateDoc(todoDoc, { title: updatedTodo });
    fetchTodos(); 
  };

  const deleteTodo = async (id) => {
    const todoDoc = doc(db, "todos", id);
    await deleteDoc(todoDoc);
    fetchTodos();
  };


  const fetchTodos = async () => {
    const todosCollection = collection(db, "todos");
    const todoSnapshot = await getDocs(todosCollection);
    const todoList = todoSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTodos(todoList);
  };

  return (
    <div className="bg-gradient-to-r from-sky-400 to-blue-500 min-h-screen flex items-center justify-center">
      <div className="app container mx-auto max-w-lg p-4 my-20 bg-sky-300 rounded-lg shadow-lg text-black">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-900">My Todo App</h1>
        <div className="mb-4 flex flex-col sm:flex-row items-center pl-[20px] ">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            className="border p-2 mr-2  h-[56px] flex-1 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
          <button
            onClick={addTodo}
            className="bg-blue-900  h-[56px] text-white p-2 rounded-lg shadow-md hover:bg-blue-950 transition duration-200 ease-in-out"
          >
            Add Todo
          </button>
        </div>
        <ul className="list-disc pl-5">
          {todos.map(todo => (
            <li key={todo.id} className="mb-2 flex items-center bg-white p-2 rounded-lg shadow-sm">
              <span className="flex-1">{todo.title}</span>
              <button
                onClick={() => editTodo(todo.id)}
                className="bg-yellow-500 text-black p-2 rounded-lg shadow-md hover:bg-yellow-600 transition duration-200 ease-in-out mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 text-black p-2 rounded-lg shadow-md hover:bg-red-600 transition duration-200 ease-in-out"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;