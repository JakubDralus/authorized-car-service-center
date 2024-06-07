
interface User {
  id: number,
  name: string,
  email: string,
  role: string
}

const UserTable = () => {

    // Sample user data (to be deleted)
  const users: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Tom Brown", email: "tom@example.com", role: "User" },
  ];

  return (
    <>
    <h1 className="text-2xl mb-3 ml-2 font-medium">Users</h1>

    <div className="flex flex-col bg-white shadow-md mt-8">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <table className="min-w-full">
            <thead className="border-b-2">
              <tr>
                <th scope="col" className="text-md font-bold text-gray-900 px-6 py-4 text-left">ID</th>
                <th scope="col" className="text-md font-bold text-gray-900 px-6 py-4 text-left">Name</th>
                <th scope="col" className="text-md font-bold text-gray-900 px-6 py-4 text-left">Email</th>
                <th scope="col" className="text-md font-bold text-gray-900 px-6 py-4 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">{user.id}</td>
                  <td className="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserTable;