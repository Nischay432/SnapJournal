import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateComponent from "./components/CreateComponent";
import ShowComponent from "./components/ShowComponent";
import "./main.css";
import Login from "../src/components/login.jsx";
import Register from "../src/components/register.jsx";
import AuthContextProvider from './context/AuthContextProvider';

export default function Index() {
  return (
    
      <BrowserRouter basename="/">
        <AuthContextProvider>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/create" element={<CreateComponent />}></Route>
          <Route path="/show" element={<ShowComponent />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Index />);
