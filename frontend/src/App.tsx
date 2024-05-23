import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Service from './pages/service/Service';
import Services from './pages/services/Services';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index errorElement={<div>404 not found</div>} element={<Home/>}/>
        <Route path='/login' errorElement={<div>404 not found</div>} element={<Login/>}/>
        <Route path='/signup' errorElement={<div>404 not found</div>} element={<Signup/>}/>
        <Route path='/service' errorElement={<div>404 not found</div>} element={<Service/>}/>
        <Route path='/services' errorElement={<div>404 not found</div>} element={<Services/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
