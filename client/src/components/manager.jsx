
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from "uuid";

const manager = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const eye = useRef()//// it is used to reference a element easily instead of doing this "document.getElementById"
  const passwordref = useRef()
  const [form, setform] = useState({ url: "", username: "", password: "" })////state from where our FORM is saving
  const [passwordArray, setPasswordArray] = useState([])//// Array where we are svaing all entries in a array


const loadPasswords =  async()=>{
   let req =  await fetch('https://passop-90wg.onrender.com/')
   let passwords = await req.json()
   setPasswordArray(passwords)
   console.log(passwords)
}


  //////////Use effect runs on every reload or rerender and this funstions is checking if A "passwords" name item is available in local storage
  useEffect(() => {
    loadPasswords()
   


  }, [])

  const copyText = (text) => {
    toast('Copied to ClipBoard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",

    });
    navigator.clipboard.writeText(text)

  }


  const showpassword = () => {
    passwordref.current.type = "password"
    if (eye.current.src.includes("eye.png")) {
      eye.current.src = "hidden.png"
      passwordref.current.type = "text"

    } else {
      eye.current.src = "eye.png"
      passwordref.current.type = "password"
    }


  }


  ///this funtion is saving the password 
  const savePassword =  async () => {

    setPasswordArray([...passwordArray, {...form, id: uuidv4()}])///with setPasswordArray we set the value and first we populated the passwordArray and than added form in it
    //localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))///here we are setting a item named "passwords" 
   //await fetch("http://localhost:3000/", {method:"DELETE", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ id: form.id})})




   await fetch("https://passop-90wg.onrender.com//", {method:"POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({...form, id: uuidv4()})})
    setform({ url: "", username: "", password: "" })
    toast('Password Saved!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",

    });
    console.log([...passwordArray, form])

  }
  const deletePassword = async (id)=>{
    console.log("deleting password with id ", id)
    setPasswordArray(passwordArray.filter(item=>item.id!==id))
   // localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!==id)))
   let res = await fetch("https://passop-90wg.onrender.com/", {method:"DELETE", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ id})})
    toast('Password Deleted!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",

    });
  }
  const editPassword = (id)=>{
    console.log("Editing password with id ", id)
    setform({...passwordArray.filter(i=>i.id===id)[0], id: id})
    setPasswordArray(passwordArray.filter(item=>item.id!==id))
   
  }
  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })

  }


  return (
    <>
      <div>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition="Bounce"
        />
        {/* Same as */}
        <ToastContainer />
      </div>
      <div className="absolute top-0 -z-10 h-full w-full bg-white">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(123,252,132,0.58)] opacity-50 blur-[80px]"></div>
      </div>

      <div className="mycontainer flex-col py-10 ">
      <div className="rounded-lg p-10 flex flex-col w-full md:w-[100vw] lg:w-[70vw]">
          <div className="mycontainer flex-col">
            <div className="flex">
              <span className="text-green-500 font-bold text-2xl">&lt;</span>
              <h1 className="font-bold text-black text-2xl">Pass</h1>
              <span className="text-green-500 font-bold text-2xl">Op/&gt;</span>
            </div>
            <p className=" text-sm md:font-bold  md:text-lg text-green-500">
              Your Own Password Manager
            </p>
          </div>

          <div className=" flex-col py-4">
            <input
              value={form.url}
              onChange={handlechange}
              placeholder="Enter Website URL"
              className="flex w-full min-h-8 px-4 rounded-full border border-green-600"
              type="text"
              name="url"
              id="1"
            />

            <div className="py-4 w-full flex  flex-colgap-4 md:flex-row ">
              <input
                value={form.username}
                onChange={handlechange}
                placeholder="Enter Your UserName"
                className=" rounded-full w-full min-h-8 px-4 border border-green-600"
                type="text"
                name="username"
                id="2"
              />
              <div className="relative lg:min-w-[22vw]">
                <input
                  ref={passwordref}
                  value={form.password}
                  onChange={handlechange}
                  placeholder="Enter your Password"
                  className="rounded-full w-full border px-4  min-h-8 border-green-600"
                  type="password"
                  name="password"
                  id="3"
                />
                <span className="absolute right-1 top-0 bottom-0 pt-1 pr-1"><img onClick={showpassword} ref={eye} className="w-6 cursor-pointer" src="/eye.png" alt="eye" /></span>
              </div>
            </div>
          </div>
          <button onClick={savePassword} className="flex self-center px-5 py-1 w-fit justify-center items-center rounded-full bg-green-500 hover:bg-green-400">
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"

            ></lord-icon>
            Save Password
          </button>



          <div className="passwords overflow-x-auto">
            <h2 className="font-bold text-xl py-4">Your Passwords</h2>
            {passwordArray.length === 0 ? <div>No passwords to show.</div> :
              <table className="w-full rounded-lg md:overflow-hidden  ">
                <thead className="bg-green-500 text-white h-7 rounded-lg text-md " >
                  <tr>
                    <th >URL</th>
                    <th>Username</th>
                    <th >Password</th>
                    <th >Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100">


                  {passwordArray.map((item, index) => {


                    return <tr key={index} className="text-center"  >
                      <td className="py-2 px-7 border    border-white "> <a href={item.url} target="_blank">{item.url}</a>
                        <lord-icon
                          onClick={() => { copyText(item.url) }}

                          style={{ "width": "19px", "height": "19px", "paddingTop": "5px", "cursor": "pointer", "paddingLeft": "2px" }}
                          src="https://cdn.lordicon.com/xljvqlng.json"
                          trigger="hover"
                        >
                        </lord-icon></td>
                      <td className="py-2 px-4 border  border-white">{item.username}
                        <lord-icon
                          onClick={() => { copyText(item.username) }}

                          style={{ "width": "19px", "height": "19px", "paddingTop": "5px", "cursor": "pointer", "paddingLeft": "2px" }}
                          src="https://cdn.lordicon.com/xljvqlng.json"
                          trigger="hover"
                        >
                        </lord-icon>
                      </td>
                      <td className="py-2 border px-4 border-white">{"*".repeat(item.password.length)}
                        <lord-icon
                          onClick={() => { copyText(item.password) }}
                          style={{ "width": "19px", "height": "19px", "paddingTop": "5px", "cursor": "pointer", "paddingLeft": "2px" }}
                          src="https://cdn.lordicon.com/xljvqlng.json"
                          trigger="hover"
                        >
                        </lord-icon>
                      </td>
                      <td className=" px-8  border border-white ">
                        <span className="cursor-pointer md:pr-3" onClick={()=>{editPassword(item.id)}}><lord-icon
                        style={{ "width": "25px", "height": "25px", "cursor": "pointer"}}
                          src="https://cdn.lordicon.com/xunzgeah.json"
                          trigger="hover"
                        >
                        </lord-icon></span>
                        <span className="cursor-pointer" onClick={()=>{deletePassword(item.id)}}><lord-icon
                           style={{ "width": "25px", "height": "25px", "cursor": "pointer"}}
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                        >
                        </lord-icon></span>
                      </td>
                    </tr>
                  })}

                </tbody>
              </table>}
          </div>
        </div>
      </div>
    </>
  );
};

export default manager;
