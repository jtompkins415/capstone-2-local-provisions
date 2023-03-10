import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home'
import NavBar from './routes-nav/NavBar';

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
      <Routes>
        <Route path='/sf-bayarea' element={<Location />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
