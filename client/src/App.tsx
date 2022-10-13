import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Layout from './Layout/Layout';
import ChatBody from './pages/Chat/ChatBody';
import Login from './pages/Login/Login';

export const App: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Layout />} />
    </Routes>
  </BrowserRouter>
  );
};
