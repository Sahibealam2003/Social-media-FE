import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { clearData } from '../Utils/UserSlice'

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const nav = useNavigate()
  const dispatch = useDispatch()

  function logout() {
    async function logOut() {
      const res = await axios.post(
        import.meta.env.VITE_DOMAIN + "/api/auth/logout",
        {},
        { withCredentials: true }
      )
      dispatch(clearData())
      nav("/login")
    }
    logOut()
  }

  return (
    <div
      className={
        "h-[94vh] bg-white shadow-md flex flex-col p-4 relative transition-all duration-300 " +
        (showSidebar ? "w-64" : "w-20")
      }
    >
      {/* Toggle Button */}
      {!showSidebar ? (
        <div className="flex items-center justify-center mb-6">
          <i
            onClick={() => setShowSidebar(true)}
            className="fa-solid fa-bars text-xl cursor-pointer text-gray-800"
          ></i>
        </div>
      ) : (
        <div className="absolute top-4 right-4">
          <i
            onClick={() => setShowSidebar(false)}
            className="fa-solid fa-arrow-left text-xl cursor-pointer text-gray-800"
          ></i>
        </div>
      )}

      {/* Nav Links */}
      <nav className="flex flex-col space-y-4 font-medium mt-10">
        <Link to="/" className="cursor-pointer">
          <p className="flex items-center gap-4 px-3 py-2 rounded-md transition cursor-pointer text-gray-800">
            <i className="fa-regular fa-house text-lg text-gray-800"></i>
            {showSidebar && <span className="whitespace-nowrap">Home</span>}
          </p>
        </Link>

        <Link to="/profile" className="cursor-pointer">
          <p className="flex items-center gap-4 px-3 py-2 rounded-md transition cursor-pointer text-gray-800">
            <i className="fa-solid fa-user text-lg text-gray-800"></i>
            {showSidebar && <span className="whitespace-nowrap">Profile</span>}
          </p>
        </Link>

        <Link to="/chats" className="cursor-pointer">
          <p className="flex items-center gap-4 px-3 py-2 rounded-md transition cursor-pointer text-gray-800">
            <i className="fa-solid fa-comments text-lg text-gray-800"></i>
            {showSidebar && <span className="whitespace-nowrap">Chats</span>}
          </p>
        </Link>

        <Link to="/add" className="cursor-pointer">
          <p className="flex items-center gap-4 px-3 py-2 rounded-md transition cursor-pointer text-gray-800">
            <i className="fa-solid fa-plus text-lg text-gray-800"></i>
            {showSidebar && <span className="whitespace-nowrap">Add New Post</span>}
          </p>
        </Link>
      </nav>

      {/* Spacer */}
      <div className="flex-grow"></div>

      {/* Logout Button */}
      {showSidebar && (
        <button
          onClick={logout}
          className="w-full py-2 rounded-lg font-semibold transition cursor-pointer"
        >
          Logout
        </button>
      )}
    </div>
  )
}

export default Sidebar
