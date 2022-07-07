import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from '../Home';
import Navbar from '../Navbar';

export default function index() {
  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" exact="true" element={<Home />} />
        </Routes>
    </BrowserRouter>
  )
}
