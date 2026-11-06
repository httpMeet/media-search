import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increaseByAmount, increment } from './redux/features/counterSlice'

const App = () => {

  const [num, setNum] = useState(0)

  const dispatch = useDispatch()
  const count = useSelector((state) => state.counter.value)

  return (
    <div>
      <h1>{count}</h1>

      <button onClick={() => {
        dispatch(increment())
      }}>
        Increment
      </button>

      <button onClick={() => {
        dispatch(decrement())
      }}>
        Decrement
      </button>

      <input 
        type="number" 
        value={num} 
        onChange={
          (e) => {
            if(e.target.value >= 0){
              setNum(e.target.value);
            }
      }} />

      <button onClick={() => {
        dispatch(increaseByAmount(Number(num)))
      }}>
        Increase by Amount
      </button>

    </div>
  )
}

export default App