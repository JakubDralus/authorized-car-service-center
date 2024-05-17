import { Link } from "react-router-dom";

const SidebarLink = ({ to, label, pathname, svg }: any) => {
  const isActive = pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-2 mt-2 text-gray-100 rounded-md 
      ${isActive ? 'sidebar-link-select hover:bg-gray-800' : 'hover:bg-gray-800'}`}
    >
      {svg}
      <span className="ml-2">{label}</span>
    </Link>
  );
};

export default SidebarLink;