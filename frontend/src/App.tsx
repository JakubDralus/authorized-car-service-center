import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Service from './pages/service/Service';
import Services from './pages/services/Services';
import CustomScroll from './components/scroll/CustomScroll';
import Dashboard from './pages/dashboard/Dashboard';
import Contact from './pages/contact/Contact';
import AssignTasks from './pages/dashboard/AssignTasks';
import MechanicTasks from './pages/dashboard/MechanicTasks';
import { TicketForm } from './pages/ticket_form/TicketForm';
import Review from './pages/review/Review';
import UserTable from './components/dashboard_components/Usertable';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <BrowserRouter>
      <CustomScroll />
      <Routes>
        <Route index errorElement={<div>404 not found</div>} element={<Home/>}/>
        <Route path='/error' element={<PageNotFound/>}/>
        <Route path='/login' errorElement={<div>404 not found</div>} element={<Login/>}/>
        <Route path='/signup' errorElement={<div>404 not found</div>} element={<Signup/>}/>
        <Route path='/service/:id' errorElement={<div>404 not found</div>} element={<Service/>}/>
        <Route path='/services' errorElement={<div>404 not found</div>} element={<Services/>}/>
        <Route path='/contact' errorElement={<div>404 not found</div>} element={<Contact/>}/>
        <Route path='/dashboard/*' errorElement={<div>404 not found</div>} element={<Dashboard/>}>
          <Route path="assign-tasks" element={<AssignTasks />} />
          <Route path="mechanic-tasks" element={<MechanicTasks />} />
          {/* invoices, ... */}
          <Route path="users" element={<UserTable />}/>
          {/* rest of the dashboard ... */}
        </Route>
        <Route path='/ticket-form' errorElement={<div>404 not found</div>} element={<TicketForm />}/>
        <Route path='/review' errorElement={<div>404 not found</div>} element={<Review/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
