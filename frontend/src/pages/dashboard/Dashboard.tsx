import DashboardNavbar from "../../components/dashboard_components/DashboardNavbar";
import UserTable from "./Usertable";
import Stats from "../../components/dashboard_components/Stats";
import Sidebar from "../../components/dashboard_components/DashboardSidebar";
import Stats2 from "../../components/dashboard_components/Stats2";
import { useState } from "react";
import Calendar from "../../components/dashboard_components/Calendar";
import AssignTasks from "../../components/dashboard_components/AssignTasks";

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
  // const userRole: string = "manager"; // todo: get this from logged user
  
  const [selectedComponent, setSelectedComponent] = useState(''); // State to track the selected component

  // Function to render the selected component
  const renderComponent = () => {
    switch (selectedComponent) {
      case 'users':
        return <UserTable users={users} />;
      case 'mechanics':
        return <div>Mechanics Component</div>;
      case 'accountants':
        return <div>Accountants Component</div>;
      case 'managers':
        return <div>Managers Component</div>;
      case 'services':
        return <div>Services Component</div>;
      case 'tickets':
        return <div>Tickets Component</div>;
      case 'invoices':
        return <div>Invoices Component</div>;
      case 'assignments':
        return <div>Assignments Component</div>;
      case 'cars':
        return <div>Cars Component</div>;
      case 'reviews':
        return <div>Reviews Component</div>;
      case 'ticket-updates':
        return <div>Ticket Updates Component</div>;

      case 'Assign tasks':
        return <AssignTasks />;
      case 'Invoices':
        return <p>invoices</p>
        
      default:
        return <>
          <Stats />
          <Stats2 />
          <Calendar/>
        </>;
    }
  };

  return (
    <>
      <DashboardNavbar onSelectComponent={setSelectedComponent} />
      <div className="flex flex-col sm:flex-row bg-gray-100 h-auto min-h-screen overflow-auto">
        <Sidebar role={userRole} activeComponent={selectedComponent} onSelectComponent={setSelectedComponent} />
        <div className="flex flex-col flex-1 p-5">
          <div className="mt-2">
            {renderComponent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
