import DashboardNavbar from "./DashboardNavbar";
import UserTable from "./Usertable";
import Stats from "./Stats";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";

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
  
  return (
    <>
      <DashboardNavbar />
  
      <div className="flex flex-col sm:flex-row bg-slate-100 h-screen overflow-auto">
    
        <Sidebar />

        <div className="flex flex-col flex-1 p-5">

          <Stats />
          
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
