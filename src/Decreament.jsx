import React from 'react'

const Decreament=React.memo(({sign, onDecrement})=>{
    console.log("button created");
  return (
    <div>
      <button onClick={onDecrement}>{sign}</button>
    </div>
  )
})
export default Decreament;
