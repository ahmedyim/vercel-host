import {createSlice} from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name:"todo",
    initialState:{todo:[]},
    reducers:{
        createTodo:(state,action)=>{
            state.todo.push(action.payload);
        },
        deleteTodo:(state,action)=>{
            state.todo=state.todo.filter((item)=>item.id!==action.payload);

        }
    
    }
})
export const {createTodo,deleteTodo} = todoSlice.actions;
export default todoSlice.reducer;