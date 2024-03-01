import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import SignIn from './pages/SignIn'
import Home from './pages/Home'

function App() {
  return (
    /*<div>
      <SignIn />
    </div>*/

    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path='/' element={<SignIn />}/>
            <Route path='/home' element={<Home />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

