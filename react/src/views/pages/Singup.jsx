import { useRef } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../../axios-client'
import { useStateContext } from '../../context/ContextProvider'
function Singup() {

  const nomRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()

  const { setUser, setToken } = useStateContext()

  const submitForm = (event) => {
    event.preventDefault()
    const payload = {
      name: nomRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      passeword_confirmation: passwordConfirmRef.current.value
    }
    axiosClient.post('/signup', payload)
      .then(({ data }) => {
        setUser(data.user)
        setToken(data.token)
      }).catch((error) => {
        const response = error.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      })

  }


  return (

    <div className="w-full flex items-center px-4 py-16 bg-sky-950 min-h-screen sm:px-6 lg:px-8    " style={{
      backgroundImage: `url("/img.png")`,
    }}>
      <div className="mx-auto max-w-lg pb-8 pt-6">

        <form
          action=""

          onSubmit={submitForm}
          className="mb-0 mt-6 space-y-4   shadow-black/50 shadow-md  p-4 rounded-xl bg-gray-50  sm:p-6 lg:p-8"

        >
          <div className='flex justify-center '>
            <img src="/alliance-francaise-logo-vector.svg" className='max-w-[55%]  mb-6' alt="alliance-francaise" />
          </div>

          <div>
            <label htmlFor="email" className="sr-only">Email</label>

            <div className="relative">
              <input
                type="text"
                name="nom"
                ref={nomRef}
                className="w-full rounded-xl border-sky-950 bg-gray-200 border-2 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter nom"
              />


              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <i className="fa-solid fa-user fa-xl text-sky-950" ></i>
              </span>
            </div>
          </div>



          <div>
            <label htmlFor="email" className="sr-only">Email</label>

            <div className="relative">
              <input
                type="email"
                name="email"
                ref={emailRef}
                className="w-full rounded-xl border-sky-950 bg-gray-200 border-2 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
              />


              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <i className="fa-solid fa-user fa-xl text-sky-950" ></i>
              </span>
            </div>
          </div>


          <div>
            <label htmlFor="password" className="sr-only">Confirme Password</label>

            <div className="relative">
              <input
                type="password"
                name="password"
                ref={passwordRef}
                className="w-full rounded-xl border-sky-950 bg-gray-200 border-2  p-4 pe-12 text-sm shadow-sm"
                placeholder="Confirme password"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <i className="fa-solid fa-lock fa-xl text-sky-950"></i>
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>

            <div className="relative">
              <input
                type="password"
                name="confirm password"
                ref={passwordConfirmRef}
                onChange={() => { console.log(passwordConfirmRef.current.value, passwordRef.current.value) }}

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

          
          <Link to="/login" className='text-red-600 text-capitalize' >Login</Link>
        </form>

      </div>
    </div>


  )
}

export default Singup