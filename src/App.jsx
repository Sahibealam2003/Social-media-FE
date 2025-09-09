import React, { createContext, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Signup from './Components/Signup'
import  { Toaster } from 'react-hot-toast';


export const uiContext =  createContext()

const App = () => {
  const[ui, setUi] = useState(0) 
  const[email, setEmail] = useState("")

  return (
    <uiContext.Provider value={{ui, setUi, email, setEmail}}>

    <div>
     <Toaster />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>

    </uiContext.Provider>

  )
}

export default App