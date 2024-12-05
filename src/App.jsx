import { useState } from 'react'  
import './App.css'
import Countertime from './countertime'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <Countertime/>
   </>
  )
}

export default App
