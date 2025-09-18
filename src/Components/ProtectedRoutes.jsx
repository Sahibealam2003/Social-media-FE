import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { HashLoader } from 'react-spinners'
import axios from 'axios'
import { addUserData } from '../Utils/UserSlice'

const ProtectedRoutes = () => {
    const userSliceData = useSelector(store => store.user)
    const dispatch = useDispatch()

    useEffect(() => {
        async function getUserData() {
            try {
                const res = await axios.get(import.meta.env.VITE_DOMAIN + "/api/auth/get-user-data", { withCredentials: true })
                dispatch(addUserData(res.data.data))
            } catch (error) {
                window.location = "/login"
            }
        }
        getUserData()
    }, [])

    return !userSliceData?.username ? (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600">
            <HashLoader 
                color="#ffffff" // loader ka color gradient ke against visible hona chahiye
                size={100}
            />
        </div>
    ) : <Outlet />
}

export default ProtectedRoutes
