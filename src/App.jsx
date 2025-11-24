import { useState } from 'react'
import ListingPanel from './Components/ListingPanel'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ListingPanel/>
    </>
  )
}

export default App
