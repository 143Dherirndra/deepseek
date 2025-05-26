import React from 'react'
import { Cookie, LogOut, X } from 'lucide-react'
import profile from '../../public/profile.png'
import { useAuth } from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function Sidebar() {
  const user =JSON.parse(localStorage.getItem("user"))
  const navigate =useNavigate();
  const [,setAuthUser]=useAuth();
  const handleLogout= async()=>{
    try {
      const  {data}=await axios.get("http://localhost:8080/api/v1/user/logout",{
        withCredentials:true
      })
      localStorage.removeItem("user");
    localStorage.removeItem("token");

    alert(data.message);


    setAuthUser(null);
    navigate("/login");
      
    } catch (error) {
      alert(error?.response?.data?.error || "Logout failed")
    }
    
   
   
  }
  return <div className='flex flex-col h-full bg-[#232327]'>
    {/* this is header */}
    <div className='p-4 border-b border-x-gray-700 flex items-center justify-between hover:cursor-pointer'>
      <div className='text-xl font-bold text-white'>deepseek</div>
      <button className='text-gray-300 h-6 w-6'><X/></button>
      </div>
    {/* this is history */}
    <div className='flex-1 overflowy-y-auto p-4 space-y-4'>
      <button className='w-full bg-indigo-600 text-white p-4 py-2 rounded-xl mb-4'> + New chat</button>
      <div className='text-gray-500 text-sm mt-20 text-center'
      >no chat history yet</div>
    </div>
    {/* this is footer */}
    <div className='p-4 border-gray-700 border-t'>
      <div className=' flex flex-col gap-3 '>
        <div className=' flex  items-center gap-2 cursor-pointer'>
          <img className='rounded-full w-8 h-8' src={profile} alt=''/>
          <span className='text-gray-300'>{user?user.firstName:"my profile"}</span>

        </div>
        
          <button 
          onClick={handleLogout}
          className='flex items-center gap-3 text-white rounded-lg text-sm hover:bg-gray-400 duration-200 transition'><LogOut/>Logout</button>
        
      </div>
    </div>

  </div>
  
}

export default Sidebar
