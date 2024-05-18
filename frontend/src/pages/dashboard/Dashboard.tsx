import DashboardNavbar from "../../components/dashboard_components/DashboardNavbar";
import UserTable from "./Usertable";
import Stats from "../../components/dashboard_components/Stats";
import Sidebar from "../../components/dashboard_components/DashboardSidebar";
import { Route, Routes } from "react-router-dom";
import Stats2 from "../../components/dashboard_components/Stats2";

interface User {
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
  
  return (
    <>
      <DashboardNavbar />
  
      <div className="flex flex-col sm:flex-row bg-gray-100 h-auto min-h-screen overflow-auto">
    
        <Sidebar role={userRole} />

        <div className="flex flex-col flex-1 p-5">

          <Stats />
          <Stats2 />
          
          <div className="p-4">
            <Routes>
              <Route path="/users" element={<UserTable users={users} />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
