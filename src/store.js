import { configureStore } from "@reduxjs/toolkit";      
import counterReducer from "./slices/counterSlice";
import todoReducer from "./slices/todoSlice";


const store = configureStore({
    reducer:{
        counter:counterReducer,
        todo:todoReducer
    }
})
export default store;