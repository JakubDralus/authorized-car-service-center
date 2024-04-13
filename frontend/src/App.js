import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index errorElement={<div>404 not found</div>} element={<Home/>}/>
        <Route path='/login' errorElement={<div>404 not found</div>} element={<Login/>}/>
        <Route path='/signup' errorElement={<div>404 not found</div>} element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
