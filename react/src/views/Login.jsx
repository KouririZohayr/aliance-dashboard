import React,{useRef, useState} from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../context/ContextProvider'
function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const { setUser, setToken } = useStateContext()

    const submitForm = (event) => {
      event.preventDefault()
   
      const payload={
        email : email,
        password : password,
      }
      axiosClient.post('/login', payload)
      .then(({data})=>{
        setUser(data.user)
        setToken(data.token)
      }).catch((error)=>{
       
        const response= error.response;
        if(response && response.status === 422 ){
          console.log(response.data.errors);
        }
      })
    }
  

  return (

    <div className="w-full flex items-center px-4 py-16 bg-sky-950 min-h-screen sm:px-6 lg:px-8    " style={{ 
          backgroundImage: `url("/img.png")` ,
        }}> 
      <div className="mx-auto max-w-lg pb-8 pt-6">
      
        <form
      onSubmit={submitForm}
       action='post'
          
          className="mb-0 mt-6 space-y-4   shadow-black/50 shadow-md  p-4 rounded-xl bg-gray-50  sm:p-6 lg:p-8"

        >
          <div className='flex justify-center '>
        <img src="/alliance-francaise-logo-vector.svg" className='max-w-[55%]  mb-6' alt="alliance-francaise" />
        </div>

          <div>
            <label htmlFor="email" className="sr-only">Email</label>

            <div className="relative">
              <input
                type="email"
                
                
                onChange={(e)=>setEmail(e.target.value)}
           
                className="w-full rounded-xl border-sky-950 bg-gray-200 border-2 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
              />
         

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <i className="fa-solid fa-user fa-xl text-sky-950" ></i>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">Password</label>

            <div className="relative">
              <input
                type="password"
                
               
                onChange={(e)=>setPassword(e.target.value)}
                
                className="w-full rounded-xl border-sky-950 bg-gray-200 border-2  p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <i className="fa-solid fa-lock fa-xl text-sky-950"></i>
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="block w-full mt-5 rounded-lg bg-sky-800 px-5 py-4 text-sm font-medium text-white"
          >
            Connexion
          </button>
          <span>Already Registered? </span>	  <Link to="/register" className='text-red-600 text-capitalize' >SingUp</Link>

        </form>
      </div>
    </div>

  
  )
}

export default Login