import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import InputCard from './Pages/InputCard.jsx'
import ManageHostels from './Pages/ManageHostels.jsx'
import Rooms from './Pages/Rooms.jsx'
import Teams from './Pages/Teams.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route path = "hostels" element={<ManageHostels/>}/>
      <Route path = "" element={<InputCard/>}/>
      <Route path = "rooms" element={<Rooms/>}/>
      <Route path = "teams" element={<Teams/>}/>

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
