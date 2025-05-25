import React from 'react'
import Sidebar from './Sidebar'
import Prompt from './Prompt'

function Home() {
  return <div className='flex h-screen bg-[#1e1e1e]'>
     {/* sidebar */}
    <div className='w-64 bg-[#232327] text-white'>
      <Sidebar/>
    </div>

     {/* prompt */}
     <div className='flex-1  flex flex-col w-full'>
      <div className='flex-1 flex  items-center justify-center px-6 text-white'><Prompt/></div>
     </div>
    </div>
  
}

export default Home