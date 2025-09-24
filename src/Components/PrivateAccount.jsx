import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const PrivateAccount = ({data}) => {

  console.log(data)
  const{userId} = useParams()

    const {
    profilePicture,
    firstName,
    lastName,
    username,
    bio,
    posts,
    followers,
    following,
  } = data


  return (
    <div className='mx-auto mt-10'>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <img
          src={
            profilePicture ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt={`${firstName} ${lastName}`}
          className="w-32 h-32 rounded-full object-cover border-4 border-pink-200 shadow-md"
        />

        <div className="flex-1">
          <div className="flex items-center gap-4">
            <p className="text-2xl font-bold text-gray-800">
              {firstName + " " + lastName}{" "}
              <span className="text-gray-500 text-lg font-normal">
                @{username}
              </span>
            </p>

       
          </div>

          {/* Stats */}
          <div className="flex gap-6 mt-3 text-gray-700">
            <p>
              <span className="font-semibold">{posts?.length || posts}</span> Posts
            </p>
            <p>
              <span className="font-semibold">{followers?.length || followers}</span>{" "}
              Followers
            </p>
            <p>
              <span className="font-semibold">{following?.length || following}</span>{" "}
              Following
            </p>
          </div>

          {/* Bio */}
          <p className="mt-4 text-gray-700 leading-relaxed">{bio}</p>
        </div>
      </div>

    </div>
  )


}

export default PrivateAccount