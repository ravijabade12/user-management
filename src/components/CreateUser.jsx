import React, { useState, useEffect } from "react";

function CreateUser({ addUser, updateUser, closePopup, editingUser }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Pre-fill form if editing a user
  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name,
        email: editingUser.email,
        phone: editingUser.phone,
      });
    }
  }, [editingUser]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit (Create or Update)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingUser) {
      // Update existing user
      fetch(`https://jsonplaceholder.typicode.com/users/${editingUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((updatedUser) => {
          updateUser(updatedUser); // Update user in the list
        });
    } else {
      // Create new user
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((newUser) => {
          addUser((prevUsers) => [...prevUsers, newUser]);
          closePopup(); // Close the popup after adding
        });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto relative">
        <h3 className="text-xl font-semibold mb-4">
          {editingUser ? "Edit User" : "Create User"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
            >
              {editingUser ? "Update" : "Create"} User
            </button>
            <button
              type="button"
              onClick={closePopup}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          &#x2715;
        </button>
      </div>
    </div>
  );
}

export default CreateUser;
