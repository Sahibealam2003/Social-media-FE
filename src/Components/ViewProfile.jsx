import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "../Utils/UserSlice";

const ViewProfile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliceData = useSelector((store) => store.user);
  const [isFollowing, setIsFollowing] = useState(
    sliceData.following.includes(userId)
  );
  //   console.log(isFollowing)
  const dispatch = useDispatch();

  function followBtnHandler() {
    async function followBtn() {
      if (isFollowing) {
        const res = await axios.patch(
          import.meta.env.VITE_DOMAIN +
            `/api/follow-requests/unfollow/${userId}`,
          {},
          { withCredentials: true }
        );
        // console.log(res.data)
        dispatch(addUserData(res.data.data));
        if (res.status == 200) {
          setIsFollowing(false);
          setUserData(res.data.toUserData);
        }
      } else {
        const res = await axios.post(
          import.meta.env.VITE_DOMAIN + `/api/follow-requests/${userId}`,
          {},
          { withCredentials: true }
        );
        // console.log(res.data)
        if (res.status == 200) {
          setIsFollowing(true);
          dispatch(addUserData(res.data.data));
          setUserData(res.data.toUserData);
        }
      }
    }
    followBtn();
  }

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_DOMAIN}/api/profile/${userId}`,
          { withCredentials: true }
        );
        setUserData(res.data.data);
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [userId]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!userData) return null;

  return (
    <div>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-6">
          {/* Profile Header */}
          <div className="flex gap-6 items-start w-6/12 mx-auto">
            <img
              src={
                userData.profilePicture ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt="profile"
              className="w-32 h-32 rounded-full object-cover"
            />

            <div>
              <p className="text-xl font-semibold">
                {userData.firstName} {userData.lastName}
              </p>
              {userData.isPrivate ? (
                <div className="flex gap-6 mt-2 text-gray-700">
                  <p>
                    <span className="font-bold">{userData.posts}</span> Posts
                  </p>
                  <p>
                    <span className="font-bold">{userData.followers}</span>{" "}
                    Followers
                  </p>
                  <p>
                    <span className="font-bold">{userData.following}</span>{" "}
                    Following
                  </p>
                </div>
              ) : (
                <div className="flex gap-6 mt-2 text-gray-700">
                  <p>
                    <span className="font-bold">{userData.posts.length}</span>{" "}
                    Posts
                  </p>
                  <p>
                    <span className="font-bold">
                      {userData.followers.length}
                    </span>{" "}
                    Followers
                  </p>
                  <p>
                    <span className="font-bold">
                      {userData.following.length}
                    </span>{" "}
                    Following
                  </p>
                </div>
              )}
              <p className="mt-2">{userData.bio}</p>
              <button
                onClick={followBtnHandler}
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                {!isFollowing ? "Follow" : "Unfollow"}
              </button>
            </div>
          </div>

          {/* Posts Section */}
          {userData.isPrivate ? (
            <div className="mt-20 flex justify-center items-center text-gray-500 text-lg font-medium">
              The profile account is Private
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4 mt-10">
              {userData.posts.map((item, index) => (
                <div
                  key={item._id}
                  className="relative group rounded-xl overflow-hidden shadow-md"
                >
                  <img
                    className="h-[300px] w-full object-cover transform group-hover:scale-110 transition duration-500"
                    src={
                      item.media?.[0] ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt={`post-${index}`}
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold text-lg transition">
                    ❤ {item.likes?.length || 0} &nbsp; 💬{" "}
                    {item.comments?.length || 0}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
