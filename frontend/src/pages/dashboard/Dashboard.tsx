import DashboardNavbar from "../../components/dashboard_components/DashboardNavbar";
import Sidebar from "../../components/dashboard_components/DashboardSidebar";
import Stats3 from "../../components/dashboard_components/Stats3";
import Stats4 from "../../components/dashboard_components/Stats4";
import Calendar from "../../components/dashboard_components/Calendar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function isDashboradAvailable(): boolean {
  const role = localStorage.getItem('role');
  if (!role) return false;
  return role !== 'USER';
}


const Dashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const location = useLocation();
  const userRole: string = role as string;
  // const userRole: string = "manager";

  // primitive route guard
  useEffect(() => {
    if (!isDashboradAvailable()) {
      navigate('/');
    }
  }, [role, navigate]);

  const dashboardHomepage = () => {
    return (
      <>
        <Stats3 />
        <Stats4 />
        <Calendar/>
      </>
    );
  }

  return (
    <>
      {isDashboradAvailable() && (
        <div>
        <DashboardNavbar />
        <div className="flex flex-col sm:flex-row bg-gray-100 min-h-screen overflow-x-auto ">
          <Sidebar role={userRole} />
          <div className="flex flex-col flex-1 p-5 ">
            <div className="mt-2">
              { location.pathname === '/dashboard' ? dashboardHomepage() : <Outlet/> }
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default Dashboard;
