import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const userData = useSelector(store => store.user)

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white shadow-md">
      {/* Logo */}
      <h3 className="text-2xl font-bold text-blue-600">LOGO</h3>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        className="w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* User Section */}
      <div className="flex items-center space-x-3">
        <p className="text-gray-700 font-medium">{userData.username}</p>
        <img
          src={userData.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  )
}

export default Navbar