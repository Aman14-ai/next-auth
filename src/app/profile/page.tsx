"use client"
import React, { useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<any>(null);

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout")
      // console.log("Response from backend while logging out");
      // console.log(response);// promise
      toast.success(response.data.message);
      // redirect to login page
      setTimeout(() => {
        router.push("/login");
        router.refresh();
      }, 2500)
    }
    catch (error) {
      console.log("Error in frontend while logging out");
      console.log(error);
      toast.error("Error while logging out. Please try again later.");

    }
  }

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      // console.log("Response from backend while getting user details");
      // console.log(response.data.data._id);
      setUserId(response.data.data._id);
      toast.success(response.data.message);
      // redirect to user details page
      setTimeout(() => {
        router.push(`/profile/${response.data.data._id}`);
        router.refresh();
      }, 2500)
    }
    catch (error: any) {
      console.log("Error in frontend while getting user details");
      console.log(error);
      toast.error(error.error || "Something went wrong...");

    }
  }





  return (
    <div className=" mx-auto px-4">
      <ToastContainer />

      <div className='flex justify-between items-center p-4 rounded-2xl bg-gradient-to-r from-[#0f172a] to-[#1e293b] shadow-lg px-8'>
        <h1 className='sm:text-xl md:text-2xl  lg:text-2xl text-[#a2f4fd] font-serif font-semibold tracking-wider'>Profile Page</h1>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-1.5 md:gap-6 w-full sm:w-auto">
          <button
            onClick={logout}
            className="cursor-pointer w-full sm:w-auto px-4 sm:px-2 lg:px-4 md:px-4 py-2 sm:py-1 text-sm md:text-base lg:text-lg bg-[#a2f4fd] hover:bg-[#7ad4e0] text-[#0f172a] font-medium rounded-lg transition-colors duration-200 shadow-sm"
          >
            Logout
          </button>
          <button
            onClick={getUserDetails}
            className="cursor-pointer w-full sm:w-auto px-4 sm:px-2 lg:px-4 md:px-4 py-2 sm:py-1 text-sm md:text-base lg:text-lg bg-[#a2f4fd] hover:bg-[#7ad4e0] text-[#0f172a] font-medium rounded-lg transition-colors duration-200 shadow-sm"
          >
            Details
          </button>
        </div>
      </div>

    </div>
  )
}

export default page
