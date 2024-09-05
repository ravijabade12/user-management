import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateUser from "./CreateUser"; // Assuming this handles both create and edit

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModalPopup, setShowModalPopup] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // Track user being edited

  // Toggle modal popup
  function handleShowModalPopup() {
    setShowModalPopup(!showModalPopup);
  }

  function closePopup() {
    setShowModalPopup(false);
    setEditingUser(null); // Reset editing user when modal is closed
  }

  // Fetch users
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch users.");
        setLoading(false);
      });
  }, []);

  // Delete user
  function handleDelete(id) {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    }).then(() => {
      setUsers(users.filter((user) => user.id !== id));
    });
  }

  // Edit user: Pre-fill data in the modal
  function handleEdit(user) {
    setEditingUser(user); // Set the user data in state for editing
    setShowModalPopup(true); // Show the modal with pre-filled data
  }

  // Update user list after editing
  function updateUserList(updatedUser) {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    closePopup(); // Close modal after update
  }

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center md:mr-32 p-3">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          className="bg-blue-500 py-2 px-3 rounded text-white"
          onClick={handleShowModalPopup}
        >
          ADD User
        </button>
      </div>

      {/* Display modal for creating or editing a user */}
      {showModalPopup && (
        <CreateUser
          addUser={setUsers} // For adding new users
          updateUser={updateUserList} // For editing existing users
          showModal={showModalPopup}
          closePopup={closePopup}
          editingUser={editingUser} // Pass the user data for editing
        />
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white border border-gray-300 shadow-md rounded-lg">
          <thead className="hidden md:table-header-group bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-gray-100 transition-colors block md:table-row"
              >
                <td className="py-3 px-6 block md:table-cell">
                  <span className="block md:hidden font-semibold">Name</span>
                  {user.name}
                </td>
                <td className="py-3 px-6 block md:table-cell">
                  <span className="block md:hidden font-semibold">Email</span>
                  {user.email}
                </td>
                <td className="py-3 px-6 block md:table-cell">
                  <span className="block md:hidden font-semibold">Phone</span>
                  {user.phone}
                </td>
                <td className="py-3 px-6 block md:table-cell text-center">
                  <span className="block md:hidden font-semibold">Actions</span>
                  <div className="space-y-2 space-x-2 md:space-y-0 md:space-x-4">
                    <Link
                      to={`/user/${user.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      View More Details
                    </Link>
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded focus:outline-none"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded focus:outline-none"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
