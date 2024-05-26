import DashboardNavbar from "../../components/dashboard_components/DashboardNavbar";
import Sidebar from "../../components/dashboard_components/DashboardSidebar";
import Stats3 from "../../components/dashboard_components/Stats3";
import Stats4 from "../../components/dashboard_components/Stats4";
import Calendar from "../../components/dashboard_components/Calendar";
import { Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {

  const location = useLocation();
  const userRole: string = "admin"; // todo: get this from logged user
  // const userRole: string = "manager";

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
  );
};

export default Dashboard;

// return (
//   <>
//     <div className="flex">
//       <h1 className="text-3xl mb-8 mr-8">Assign tasks to mechanics</h1>
//       <Dialog />
//       <button
//         onClick={handleRefresh}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-fit flex ml-3"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
//         </svg>
//         refresh
//       </button>
//     </div>

//     <div className="flex ">
//       <DragDropContext onDragEnd={onDragEnd}>
//         {columns.length > 0 && <TaskColumn column={columns[0]} />}
//         <div className="flex space-x-4 ml-3"> 
//           {columns.slice(1).map(column => (
//             <TaskColumn key={column.id} column={column} />
//             ))}
//         </div>
//       </DragDropContext>
//     </div>
//   </>
// );