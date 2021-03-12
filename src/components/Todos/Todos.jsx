import React, { useState,useEffect } from "react";
import Header from "../Header/Header";
import "./todos.css";

import { v4 } from "uuid";
const Todos = () => {
  // const [todo, setTodo] = useState([
  //   {
  //     id: v4(),
  //     task: "Counter",
  //     completed: "line-through",
  //   },
  //   {
  //     id: v4(),
  //     task: "Twitter Charcter Counter",
  //     completed: "line-through",
  //   },
  //   {
  //     id: v4(),
  //     task: "Password Matching",
  //     completed: "line-through",
  //   },
  //   {
  //     id: v4(),
  //     task: "Disable Button",
  //     completed: "line-through",
  //   },
  //   {
  //     id: v4(),
  //     task: "Age Checking",
  //     completed: "line-through",
  //   },
  //   {
  //     id: v4(),
  //     task: "Alphanumeric Password Checking",
  //     completed: "line-through",
  //   },
  //   {
  //     id: v4(),
  //     task: "Show Password",
  //     completed: "line-through",
  //   },
  //   {
  //     id: v4(),
  //     task: "Toast",
  //     completed: "line-through",
  //   },
  //   {
  //     id: v4(),
  //     task: "Add To Cart",
  //     completed: "line-through",
  //   },
  //   {
  //     id: v4(),
  //     task: "Switch Tabs",
  //     completed: "line-through",
  //   },
  //   {
  //     id: v4(),
  //     task: "Todos",
  //     completed: "line-through",
  //   },
  //   {
  //     id: v4(),
  //     task: "Design Tool Figma",
  //     completed: "",
  //   },
  //   {
  //     id: v4(),
  //     task: "Dark Mode",
  //     completed: "line-through",
  //   },
  //   {
  //     id: v4(),
  //     task: "Like",
  //     completed: "",
  //   },
  // ]);

  
  
  const [todos,setTodos]=useState([])
  const [newTask, setNewTask] = useState("");
  const [countTaskDone, setCountTaskDone] = useState(0);

useEffect(()=>{
  setCountTaskDone(todos.filter((todo)=>todo.completed==="").length)
})

useEffect(()=>{
const todos = JSON.parse(localStorage.getItem("todos"))
if(todos){
setTodos(todos)
}
},[])

useEffect(()=>{
localStorage.setItem("todos",JSON.stringify(todos))
console.log("Data Updated")
},[todos])

//  const handleKeyPress = (e)=>{
//    if(e.keycode === 13){
//      console.log(e.keycode)
//      todoAdd(newTask)
//    }
//  }
  const todoAdd = (newTask) => {
    setTodos([...todos, { id: v4(), task: newTask, completed: "" }]);
  };

  const todoDone = (id, completed) => {
    setTodos((prevState) => {
      return [
        ...prevState.map((todo) => {
          if (todo.id === id) {
            todo.completed = completed === "" ? "line-through" : "";
          }
          return todo;
        }),
      ];
    });
  };

  const todoDelete = (id) => {
    const newTodoList = todos.filter((todo) => todo.id != id);
    return setTodos(newTodoList);
  };

  const todoRemaining = () => {
    setCountTaskDone((countTaskDone) => {
      countTaskDone = 2;
    });
  };

  return (
    <div className="todos">
      <Header text="Todo List" />
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        // onKeyPress={handleKeyPress}
      />
      <button
        onClick={() => {
          todoAdd(newTask);
        }}
      >
        Add
      </button>
      <br />
      <br />
      <p>
        <span>Total : {todos.length}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>Pending : {countTaskDone}</span>
      </p>
      <table>
        <thead>
          <tr>
            <th>NO</th>
            <th>TASK</th>
            <th>DONE</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, i) => {
            return (
              <tr key={todo.id}>
                <td>{++i}</td>
                <td
                  style={{ textDecoration: todo.completed, cursor: "pointer" }}
                  onClick={() => {
                    todoDone(todo.id, todo.completed);
                  }}
                >
                  {todo.task}
                </td>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => {
                      todoDone(todo.id, todo.completed);
                      todoRemaining();
                    }}
                    checked={todo.completed}
                  />
                </td>
                <td>
                  <button onClick={() => todoDelete(todo.id)}>DELETE</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Todos;
