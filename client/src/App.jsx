import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {

  return (
    <>
    <Header/>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} /> 
        <Route exact path="/login" element={<Login/>} />
        <Route exact path='/register' element={<Register />} />
      </Routes>
    </Router>
    <Footer/>
    </>
  )
}

export default App;
