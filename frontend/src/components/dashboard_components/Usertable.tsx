
interface User {
  id: number,
  name: string,
  email: string,
  role: string
}

const UserTable = ({ users }: { users: User[] }) => {
  return (
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
  );
};

export default UserTable;