import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from '../Home';
import Navbar from '../Navbar';
import Register from '../Auth/Register';
import Profile from '../profile/Profile'

export default function index() {
  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" exact="true" element={<Home />} />
            <Route path="/register" exact="true" element={<Register />} />
            <Route path="/profile" exact="true" element={<Profile />} />
        </Routes>
    </BrowserRouter>
  )
}
