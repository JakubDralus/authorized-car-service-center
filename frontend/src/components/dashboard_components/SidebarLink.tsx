import { Link, useLocation } from "react-router-dom";

const SidebarLink = ({ label, svg, to }: any) => {

  const location = useLocation().pathname;
  const isActive = location === `/dashboard/${to}`;

  return (
    <Link
      to={to}
      // onClick={() => console.log(location)}
      className={`cursor-pointer flex items-center px-4 py-2 mt-2 text-gray-100 rounded-md 
      ${isActive ? 'sidebar-link-select hover:bg-gray-800' : 'hover:bg-gray-800'}`}
      >
      {svg}
      <span className="ml-2">{label}</span>
    </Link>
  );
};

export default SidebarLink;