import { BrowserRouter, Routes, Route } from "react-router-dom";
// import './App.css';
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import AddClass from "./pages/AddClass";
import LogIn from "./pages/LogIn";

import { createContext, useState } from "react";

export const SelectedClassesContext = createContext(null);

function App() {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [username, setUsername] = useState("");

  return (
    <SelectedClassesContext.Provider
      value={{ selectedClasses, setSelectedClasses }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addclass" element={<AddClass />} />
        </Routes>
      </BrowserRouter>
    </SelectedClassesContext.Provider>
  );
}

export default App;
