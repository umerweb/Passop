

const nav = () => {
  return (
    <nav className='flex justify-between py-3 w-full sticky top-0 z-10 px-10 bg-slate-800 align-center items-center cursor-pointer '>
        <div className='font-bold text-2xl  text-white flex items-center justify-center'>
            <span className="text-green-500 font-bold text-2xl">&lt;</span>
            Pass
            <span  className="text-green-500 font-bold text-2xl">Op/&gt;</span>
            
        </div>
        <ul className='flex gap-4 items-center text-md text-white'>
           
            
            <div className="group">
          <button className="flex bg-green-500 text-sm border-2 border-white- items-center justify-center gap-2 font-bold text-white  p-2 rounded-full  group-hover:text-slate-800 hover:bg-white ">
          <i className="fa-brands fa-github font-bold text-white text-2xl group-hover:text-slate-800 "></i>
          GitHub</button>
        </div>
            
        </ul>
       
      
    </nav>
  )
}

export default nav
