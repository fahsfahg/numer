import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Bisection from './components/Bisection'
import FalsePosition from './components/FalsePosition'
import {  BrowserRouter, Route, Routes } from "react-router-dom"
import OnePoint from './components/OnePoint'
import NewtonRaphson from './components/NewtonRaph'
import Secant from './components/Secant'
import NavComp from './components/NavComp'
import Cramer from './components/Matrix/Cramer'
import Jacobi from './components/Matrix/Jacobi'
import Conjugate from './components/Matrix/Conjugate'
import LU from './components/Matrix/LU'
import Onep from './Onep'
import OnepAgain from './components/OnepAgain'
import Onepp from './components/Onepp'
import Crud from './components/Crud'


function App() {
  // const [count, setCount] = useState(0)
  // const [data, setData] = useState(" ")

  // useEffect(() => {

  // axios.get('http://localhost:3000/problem')
  // .then(res => {
  //   let data = res.data
  //   data.forEach(val => {
  //       console.log(`${val.question}`)
  //   })
  // })
  // .catch(error => {
  //   console.log(error)
  // })
  // }, [])

  return (
    <div className="App">
      <NavComp/>
      
      <BrowserRouter>
        <Routes>
        <Route path="/home" element={<Crud/>}/>
        <Route path="/bisection" element={<Bisection/>}/>
        <Route path="/falseposition" element={<FalsePosition/>}/>
        <Route path="/onepoint" element={<OnePoint/>}/>
        <Route path="/onep" element={<Onep/>}/>
        <Route path="/onepp" element={<Onepp/>}/>
        <Route path="/onepagain" element={<OnepAgain/>}/>
        <Route path="/newtonraphson" element={<NewtonRaphson/>}/>
        <Route path='/secant' element={<Secant/>}/>
        <Route path='/cramer' element={<Cramer/>}/>
        <Route path='/jacobi' element={<Jacobi/>}/>
        <Route path='/conjugate' element={<Conjugate/>}/>
        <Route path='/lu' element={<LU/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
