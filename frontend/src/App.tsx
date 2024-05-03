import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import  LoginForm  from './components/LoginForm';
import Register from './components/Register';
import HomePage from './components/HomePage';

function App() {
  
  return (
    <>
    <Routes>
      <Route path='/' Component={LoginForm}/>
      <Route path='/register' Component={Register}/>
      <Route path='/homepage' Component={HomePage}/>
    </Routes>
    
    </>
  );
}

export default App;
