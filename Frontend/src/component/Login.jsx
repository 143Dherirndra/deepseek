// import { Eye } from 'lucide-react'
// import React, { useState } from 'react'
// import {Link, useNavigate} from 'react-router-dom'
// function signup() {
//     const [formData,setFormData]=useState({
//         firstName:"",
//         lastName:"",
//         email:"",
//         password:""
//     })
//     const [error,setError]=useState("")
//     const [loading,setLoading]=useState()
//     const navigate=useNavigate()
   
//     const handleChange=(e)=>{
//         const value=e.target.value;
//         const name=e.target.name;


//         setFormData({
//             ...formData,
//             [name]:value,
//         })
//     }

//     const handleSignup=async()=>{
//         setLoading(true)
//         setError("")
//         try {
//            const {data}= await axios.post("http://localhost:8080/api/v1/user/signup",{
//                 firstName:formData.firstName,
//                 lastName:formData.lastName,
//                 email:formData.email,
//                 password:formData.password,
//             },{
//                 withCredentials:true,

//             });
//             alert(data.message || "Signup Succeded")
//             navigate("/login")
//         } catch (error) {
//             const msg=error?.respose?.date.error || "Signup failed"
//             setError(msg)

            
//         }
//         finally{
//        setLoading(false)
//         }
//     }
//   return (
//      <div className='min-h-screen flex justify-center  items-center bg-black px-4'>
//         <div className='bg-[#1e1e1e] text-white max-w-md rounded-2xl shadow-lg p-6'>
//             {/* Heading */}
//             <h1 className='items-center justify-center text-center font-semibold'>Signup</h1>
//             {/* firstName */}
//             <div className='mb-4 mt-2'>
//             <input 
//             className='w-full bg-transparent border border-gray-400 rounded-md px-4 py-2 placeholder-gray-300 text-sm focus:outline-none focus:ring focus:ring-[#7a6ff0]'
//              type='text'
//             name='firstName'
//             placeholder='enter firstName'
//             value={formData.firstName}
//             onChange={handleChange}
//             />
//             </div>
//             {/* lastName */}
//             <div className='mb-4 mt-2'>
//             <input 
//             className='w-full bg-transparent border border-gray-400 rounded-md px-4 py-2 placeholder-gray-300 text-sm focus:outline-none focus:ring focus:ring-[#7a6ff0]'
//              type='text'
//             name='lastName'
//             placeholder='LastName'
//             value={formData.last}
//             onChange={handleChange}
//             />
//             </div>
//             {/* email */}
//             <div className='mb-4 mt-2'>
//             <input 
//             className='w-full bg-transparent border border-gray-400 rounded-md px-4 py-2 placeholder-gray-300 text-sm focus:outline-none focus:ring focus:ring-[#7a6ff0]'
//              type='text'
//             name='email'
//             placeholder='enter the email'
//             value={formData.email}
//             onChange={handleChange}
//             />
//             </div>
//             {/* password */}
//            <div className='mb-4 mt-2 relative'>
//             <input 
//             className='w-full bg-transparent border border-gray-400 rounded-md px-4 py-2 placeholder-gray-300 text-sm focus:outline-none focus:ring focus:ring-[#7a6ff0]'
//              type='password'
//             name='password'
//             placeholder='password'
//             value={formData.password}
//             onChange={handleChange}
//             />
//             <span className='absolute right-3 top-3 text-gray-400'><Eye size={18}/></span>
//             </div>
//             {/* Error Message */}
//            {error &&  <span className='text-red-500 text-sm mb-3'>{error}</span>}
//             {/* term & condition */}
//             <p className='text-xs text-gray-400 mt-4 mb-6'>by signup or loging in, you concent in deepseek <a className='underline' href=''>term of use</a> and <a className='underline' href=''>privacy policy</a> </p>
//             {/* signup buttonm */}
//             <button 
//             disabled={loading}
//             onClick={handleSignup} 
//             className='text-white w-full py-3 rounded-lg transition disabled:opacity-50 font-semibold bg-[#7a6ff6] hover:bg-[#6c61a6]'>
//                 Signup
//                 {loading? "signing...":"signup"}

//             </button>
//             {/* link */}
//             <div className='flex justify-between mt-4 text-sm'>
//                 <a className='text-[#7a6ff6] hover:underline' href=''>user already register</a>
//                 <Link className='text-[#7a6ff6] hover:underline' to={"/login"}>login</Link>
//             </div>
//         </div>
//    </div>
//   )
// }
//  export default signup

// // export default signup
// // import React from 'react'
// // import {Link} from 'react-dom'
// // function Signup() {
// //   return (
   
// //   )
// // }

// //


import { Eye } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';

function Login() {
  const [formData, setFormData] = useState({
    
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [,setAuthUser]=useAuth()

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post(
        "https://deepseekai-oi1b.onrender.com/api/v1/user/login",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(data)
      alert(data.message || "login Succeeded");
      localStorage.setItem("user",JSON.stringify(data.user))
      localStorage.setItem("token",JSON.stringify(data.token))
      setAuthUser(data.token)
      navigate("/login");
    } catch (error) {
      const msg = error?.response?.data?.error || "login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black px-4">
      <div className="bg-[#1e1e1e] text-white max-w-md rounded-2xl shadow-lg p-6">
        <h1 className="items-center justify-center text-center font-semibold">Login</h1>
        {/* <div className="mb-4 mt-2">
          <input
            className="w-full bg-transparent border border-gray-400 rounded-md px-4 py-2 placeholder-gray-300 text-sm focus:outline-none focus:ring focus:ring-[#7a6ff0]"
            type="text"
            name="firstName"
            placeholder="Enter First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4 mt-2">
          <input
            className="w-full bg-transparent border border-gray-400 rounded-md px-4 py-2 placeholder-gray-300 text-sm focus:outline-none focus:ring focus:ring-[#7a6ff0]"
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div> */}
        <div className="mb-4 mt-2">
          <input
            className="w-full bg-transparent border border-gray-400 rounded-md px-4 py-2 placeholder-gray-300 text-sm focus:outline-none focus:ring focus:ring-[#7a6ff0]"
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4 mt-2 relative">
          <input
            className="w-full bg-transparent border border-gray-400 rounded-md px-4 py-2 placeholder-gray-300 text-sm focus:outline-none focus:ring focus:ring-[#7a6ff0]"
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />
          <span className="absolute right-3 top-3 text-gray-400">
            <Eye size={18} />
          </span>
        </div>
        {error && <span className="text-red-500 text-sm mb-3">{error}</span>}
        <p className="text-xs text-gray-400 mt-4 mb-6">
          By signing up, you consent to DeepSeek's <a className="underline" href="#">Terms of Use</a> and <a className="underline" href="#">Privacy Policy</a>.
        </p>
        <button
          disabled={loading}
          onClick={handleSignup}
          className="text-white w-full py-3 rounded-lg transition disabled:opacity-50 font-semibold bg-[#7a6ff6] hover:bg-[#6c61a6]"
        >
          {loading ? "loging in..." : "Login"}
        </button>
        <div className="flex justify-between mt-4 text-sm">
          <Link className="text-[#7a6ff6] hover:underline" to={"/signup"}>signup</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
