import React from 'react'
import { useDispatch } from 'react-redux';
import {createTodo} from "./slices/todoSlice";
import { useSelector } from 'react-redux';

 function ToDo() {
    const [title,setTitle]=React.useState("");
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todo);
    console.log(todos)
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(createTodo({id:1,title:title,status:"onProgress"}));
        setTitle("");
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Add a new todo..." onChange={(e) => setTitle(e.target.value)} />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
export default ToDo;
