import React from "react";
import "./App.css";
import UserDirectory from "./pages/UserDirectory";
import UserProfile from "./pages/UserProfile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export const UserDataContext = React.createContext();
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<UserDirectory />} />
        <Route path="/:profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
