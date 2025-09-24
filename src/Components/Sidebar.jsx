import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { clearData } from "../Utils/UserSlice";
import ToggleSwitch from "./PrivacyBtn";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();

  function logout() {
    async function logOut() {
      await axios.post(
        import.meta.env.VITE_DOMAIN + "/api/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(clearData());
      nav("/login");
    }
    logOut();
  }

  const activeClass = "bg-white/30 text-purple-700 font-semibold shadow-md";

  return (
    <div
      className={
        "fixed top-[80px] left-0 bottom-0 bg-gradient-to-b from-pink-200 via-purple-200 to-blue-200 flex flex-col p-4 space-y-6 transition-all duration-300 shadow-lg z-50 " +
        (showSidebar ? "w-64" : "w-20")
      }
    >
      {/* Toggle Button */}
      <i
        onClick={() => setShowSidebar(!showSidebar)}
        className="fa-solid fa-bars text-gray-700 cursor-pointer text-xl hover:text-purple-700 transition"
      ></i>

      {/* Nav Links */}
      <nav className="flex flex-col space-y-4 font-medium text-gray-800 mt-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              isActive ? activeClass : "hover:bg-white/20 hover:text-purple-800"
            }`
          }
        >
          <i className="fa-solid fa-house"></i>
          {showSidebar && <span>Home</span>}
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              isActive ? activeClass : "hover:bg-white/20 hover:text-purple-800"
            }`
          }
        >
          <i className="fa-solid fa-user"></i>
          {showSidebar && <span>Profile</span>}
        </NavLink>

        <NavLink
          to="/chats"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              isActive ? activeClass : "hover:bg-white/20 hover:text-purple-800"
            }`
          }
        >
          <i className="fa-solid fa-comments"></i>
          {showSidebar && <span>Chats</span>}
        </NavLink>

        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              isActive ? activeClass : "hover:bg-white/20 hover:text-purple-800"
            }`
          }
        >
          <i className="fa-solid fa-plus"></i>
          {showSidebar && <span>Add New Post</span>}
        </NavLink>
        {showSidebar && <ToggleSwitch label={"Private Account"} />}

        <NavLink
          to="/review-requests"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              isActive ? activeClass : "hover:bg-white/60 hover:shadow-md"
            }`
          }
        >
          <i className="fa-solid fa-user-group"></i>
          {showSidebar && <span>Review Requests</span>}
        </NavLink>
      </nav>

      {/* Logout Button */}
      {showSidebar && (
        <button
          onClick={logout}
          className="mt-auto w-full bg-gradient-to-r from-red-400 to-pink-500 hover:opacity-90 text-white py-2 rounded-xl font-semibold shadow-md transition"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Sidebar;
