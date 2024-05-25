import DashboardNavbar from "../../components/dashboard_components/DashboardNavbar";
import UserTable from "../../components/dashboard_components/Usertable";
import Stats from "../../components/dashboard_components/Stats";
import Sidebar from "../../components/dashboard_components/DashboardSidebar";
import Stats2 from "../../components/dashboard_components/Stats2";
import { useState } from "react";
import Calendar from "../../components/dashboard_components/Calendar";
import AssignTasks from "./AssignTasks";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";

interface User { // todo: change to type from ./model
  id: number;
  name: string;
  email: string;
  role: string;
}

const Dashboard = () => {
  // Sample user data (to be deleted)
  const users: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Tom Brown", email: "tom@example.com", role: "User" },
  ];

  const userRole: string = "admin"; // todo: get this from logged user
  // const userRole: string = "manager"; // todo: get this from logged user
  
  const [selectedComponent, setSelectedComponent] = useState(''); // State to track the selected component
  const location = useLocation();

  return (
    <>
      <DashboardNavbar onSelectComponent={setSelectedComponent} />
      <div className="flex flex-col sm:flex-row bg-gray-100 h-auto min-h-screen overflow-auto">
        <Sidebar role={userRole} activeComponent={selectedComponent} onSelectComponent={setSelectedComponent} />
        <div className="flex flex-col flex-1 p-5">
          <div className="mt-2">

            <Routes>
              <Route path="assign-tasks" element={<AssignTasks />} />
              {/* invoices, ... */}
              
              <Route path="/users" element={<UserTable users={users}/>} />
              {/* rest of the paths ... */}

            </Routes>

            {
              location.pathname === '/dashboard' ? 
              <>
                <Stats />
                <Stats2 />
                <Calendar/>
              </> 
              : <Outlet/>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
