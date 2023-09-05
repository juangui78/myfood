import './App.css';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom'
import LandingPage from './views/landingPage/LandingPage'
import HomePage from './views/home/HomePage'
import DetailPage from './views/detail/DetailPage'
import FormPage from './views/form/FormPage'

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/home' element={<HomePage/>}></Route>
        <Route path='/detail/:id' element={<DetailPage/>}></Route>
        <Route path='/create' element={<FormPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
