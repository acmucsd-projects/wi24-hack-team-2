/*import React from 'react';
import './App.css';
import Classes from './components/Classes/Classes';
import ClassTimes from './components/ClassTimes/ClassTimes';
import Update from './components/Update/Update';
import Switch from './components/Switch/Switch';
import Schedule from './components/Schedule/Schedule';
import SignIn from './pages/SignIn';

//put css in a css file and import
const App = () => {

    //put java script code here
  return (
    //put html code here
    <div className="App">
      <h1 class = "top">Preferences</h1>
      <Classes />
      <ClassTimes />
      <Update />  
      <Switch />
      <Schedule />
      <SignIn />
    </div>
  );
};
export default App;
*/

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import AddClass from './pages/AddClass'

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
            <Route path='/addclass' element={<AddClass />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

