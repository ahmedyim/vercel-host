import React, { useReducer,useCallback } from "react";
import Increament from "./Increament";
import Decreament from "./Decreament";
import Layout from "./Layout";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import { useSelector ,useDispatch} from "react-redux";
import { decrement,increment,incrementByAmount } from "./slices/counterSlice";
function Counter() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  console.log(counter);
  // const counterReducer = (initialState, action) => {
  //   // console.log(initialState, action);
  //   switch (action.type) {
  //     case "INCREAMENT":
  //       return { counter: initialState.counter + 1 };
  //     case "DECREAMENT":
  //       return { counter: initialState.counter - 1 };
  //     default:
  //       return initialState;
  //   }
  // };
  // // const [state, dispatch] = useReducer(counterReducer, { counter: 0 });
  // const increment = useCallback(() => {
  //   dispatch({ type: "INCREAMENT" });
  // },[])
  // const decrement = useCallback(() => {
  //   dispatch({ type: "DECREAMENT" });
  // },[])

  //    console.log(state);
  return (
    // <Layout sidebar={<SideBar/>} header={<Header/>} >
    //   {/* <button
    //     onClick={() => {
    //       dispatch({ type: "DECREAMENT" });
    //     }}
    //   >
    //     -
    //   </button> */}
    //   {/* <button
    //     onClick={() => {
    //       dispatch({ type: "INCREAMENT" });
    //       }}
    //       >
    //       +
    //       </button> */}
    //   {/* <Decreament sign="-" onDecrement={decrement}/> */}
    //   <Decreament  sign="-" onClick={()=>dispatch(decrement())}/>
    //   <small>{counter.value}</small>
    //   {/* <Increament sign="+" onIncrement={increment}/> */}
    //   <Increament   sign="+" onClick={()=>dispatch(increment())}/>
    // </Layout>
    <>
    <button onClick={()=>dispatch(decrement())}>-</button>
    <small>{counter.value}</small>
    <button onClick={()=>dispatch(increment())}>+</button>
    <button onClick={()=>dispatch(incrementByAmount(5))}>+5</button>
    </>
  );
}

export default Counter;
