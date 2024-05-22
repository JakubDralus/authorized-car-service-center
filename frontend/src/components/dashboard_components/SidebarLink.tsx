
const SidebarLink = ({ onClick, label, isActive, svg }: any) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer flex items-center px-4 py-2 mt-2 text-gray-100 rounded-md 
      ${isActive ? 'sidebar-link-select hover:bg-gray-800' : 'hover:bg-gray-800'}`}
      >
      {svg}
      <span className="ml-2">{label}</span>
    </div>
  );
};

export default SidebarLink;