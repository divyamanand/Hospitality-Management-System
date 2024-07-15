import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Dashboard from './Pages/Dashboard.jsx'
import InputCard from './Pages/InputCard.jsx'
import ManageHostels from './Pages/ManageHostels.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route path = "dashboard" element={<Dashboard/>}/>
      <Route path = "hostels" element={<ManageHostels/>}/>
      <Route path = "" element={<InputCard/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
