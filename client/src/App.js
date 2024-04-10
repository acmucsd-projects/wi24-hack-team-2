
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import LogIn from './pages/LogIn'

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path='/' element={<SignIn />}/>
            <Route path='/login' element={<LogIn />}/>
            <Route path='/home' element={<Home />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

