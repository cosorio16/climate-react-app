import { useState } from 'react'
import './App.css'
import Card from './componets/Card'
import ReactDOM from 'react-dom'





function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='container'>
      <h1>Climate App</h1>
      <Card />
    </div >);
}

export default App
