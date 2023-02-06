import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home'
import NavBar from './NavBar';

function App() {
  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
    <BrowserRouter>  
      <Routes>
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
