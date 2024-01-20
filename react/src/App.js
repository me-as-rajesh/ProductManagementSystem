import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from './layouts/sidebar';
import Header from './layouts/header';
import Dashboard from './Dashboard';
import Login from './Account/login'
import Register from './Account/signup'
import AddProducts from './Products/addproducts';
import Products from './Products/index';
import { useDispatch, useSelector } from 'react-redux';

import {authentication} from './features/authAction';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);  
  
  useEffect(() => {
    dispatch(authentication());

  }, []);
  
  return (
    <BrowserRouter>
      {!isAuthenticated ? (
        <div className="d-flex" id="wrapper">
          <div id="page-content-wrapper">
            <Routes>
              <Route path="/" element={<Login/>} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>

      ) : (

        <div className="d-flex" id="wrapper">
          <Sidebar />
          <div id="page-content-wrapper">
            <Header />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/addproducts" element={<AddProducts />} />
              <Route path="/products" element={< Products />} />
            </Routes>
          </div>
        </div>
      )}
    </BrowserRouter>

  );
}

export default App;
