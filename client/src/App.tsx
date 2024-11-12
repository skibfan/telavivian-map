import './App.css'

import About from './components/About'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'


function App() {


  return (
    <>
      <Header />     
      <Routes >
        <Route path='/' element={<Dashboard/>} />
        <Route path='/about' element={<About/>} />
      </Routes>
    </>
  )
}

export default App
