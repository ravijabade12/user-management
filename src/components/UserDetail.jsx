import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UserDetail = () => {
  const { userId } = useParams(); // Get userId from the URL
  const [user, setUser] = useState(null); // State to store the user data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage error

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }
        const data = await response.json();
        setUser(data); // Set the fetched user data
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]); // Run this effect when userId changes

  if (loading) {
    return <div>Loading...</div>; // Show loading while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error if fetching fails
  }

  // Render user details if data is successfully fetched
  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 my-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        User Detail for ID: {userId}
      </h2>
      {user && (
        <div className="space-y-4">
          <p className="text-gray-600">
            <strong className="text-gray-800">Name:</strong> {user.name}
          </p>
          <p className="text-gray-600">
            <strong className="text-gray-800">Email:</strong> {user.email}
          </p>
          <p className="text-gray-600">
            <strong className="text-gray-800">Phone:</strong> {user.phone}
          </p>
          <p className="text-gray-600">
            <strong className="text-gray-800">Website:</strong>{" "}
            <a
              href={`http://${user.website}`}
              className="text-blue-500 hover:underline"
            >
              {user.website}
            </a>
          </p>
          <p className="text-gray-600">
            <strong className="text-gray-800">Company:</strong>{" "}
            {user.company.name}
          </p>
          <p className="text-gray-600">
            <strong className="text-gray-800">Address:</strong>{" "}
            {`${user.address.street}, ${user.address.city}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
