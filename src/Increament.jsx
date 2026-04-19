import React from 'react'

const Increament=React.memo(({sign, onIncrement})=>{
    console.log("button recreated")
  return (
    <div>
      <button onClick={onIncrement}>{sign}</button>
    </div>
  )
})
export default Increament;
