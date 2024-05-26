import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Service from './pages/service/Service';
import Services from './pages/services/Services';
import CustomScroll from './components/scroll/CustomScroll';
import Dashboard from './pages/dashboard/Dashboard';
import Contact from './pages/contact/Contact';
import { TicketForm } from './pages/ticket_form/TicketForm';

function App() {
  return (
    <BrowserRouter>
      <CustomScroll />
      <Routes>
        <Route index errorElement={<div>404 not found</div>} element={<Home/>}/>
        <Route path='/login' errorElement={<div>404 not found</div>} element={<Login/>}/>
        <Route path='/signup' errorElement={<div>404 not found</div>} element={<Signup/>}/>
        <Route path='/service/:id' errorElement={<div>404 not found</div>} element={<Service/>}/>
        <Route path='/services' errorElement={<div>404 not found</div>} element={<Services/>}/>
        <Route path='/contact' errorElement={<div>404 not found</div>} element={<Contact/>}/>
        <Route path='/dashboard/*' errorElement={<div>404 not found</div>} element={<Dashboard/>}/>
        <Route path='/ticket-form' errorElement={<div>404 not found</div>} element={<TicketForm/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
