import React, { useState } from 'react'
import DialogModal from '../comInvoice/DialogModal';
import axiosClient from '../../axios-client';

function Adduser({ getUsers }) {

    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: ''
    })
    function adduser() {
        axiosClient.post('/users', user)
            .then(() => {
                getUsers()
                closeModal()
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors)
                }
            })
    }

    const [showaddinterface, setShowaddinterface] = useState(false);
    function closeModal() { setShowaddinterface(false); setUser({}) }
    function add_interface() { setShowaddinterface(true); }
    return (
        <>
            <button onClick={() => add_interface()} className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto" >
                Ajouter ustilisateur
            </button>
            <DialogModal isOpen={showaddinterface} onClose={closeModal}>
                <DialogModal.Content title={'Créer une nouvelle Utilisateur'}>
                    <div className='my-3'>
                        <label htmlFor="email" className="sr-only">Email</label>

                        <div className="relative">
                            <input
                                type="text"
                                value={user.name} onChange={ev => setUser({ ...user, name: ev.target.value })}

                                className="w-full rounded-xl border-sky-950 bg-gray-200 border-2 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter nom"
                            />
                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                <i className="fa-solid fa-user fa-xl text-sky-950" ></i>
                            </span>
                        </div>
                    </div>
                    <div className='my-3'>
                        <label htmlFor="email" className="sr-only">Email</label>

                        <div className="relative">
                            <input
                                type="email"
                                value={user.email} onChange={ev => setUser({ ...user, email: ev.target.value })} placeholder="Email"
                                className="w-full rounded-xl border-sky-950 bg-gray-200 border-2 p-4 pe-12 text-sm shadow-sm"
                            />
                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                <i className="fa-solid fa-user fa-xl text-sky-950" ></i>
                            </span>
                        </div>
                    </div>
                    <div className='my-3'>
                        <label htmlFor="password" className="sr-only">Confirme Password</label>

                        <div className="relative">
                            <input
                                type="password" onChange={ev => setUser({ ...user, password: ev.target.value })} placeholder="Password"
                                className="w-full rounded-xl border-sky-950 bg-gray-200 border-2  p-4 pe-12 text-sm shadow-sm"
                            />
                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                <i className="fa-solid fa-lock fa-xl text-sky-950"></i>
                            </span>
                        </div>
                    </div>
                    <div className='my-3'>
                        <label htmlFor="password" className="sr-only">Password</label>

                        <div className="relative">
                            <input
                                type="password" onChange={ev => setUser({ ...user, password_confirmation: ev.target.value })} placeholder="Password Confirmation"
                                name='password'
                                className="w-full rounded-xl border-sky-950 bg-gray-200 border-2  p-4 pe-12 text-sm shadow-sm"
                            />
                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                <i className="fa-solid fa-lock fa-xl text-sky-950"></i>
                            </span>
                        </div>
                        <div className='my-3'>
                            <select
                                name='role'
                                type="password" onChange={ev => setUser({ ...user, role: ev.target.value })} placeholder="Password Confirmation"
                                className="w-full rounded-xl border-sky-950 bg-gray-200 border-2  p-4 pe-12 text-sm shadow-sm">
                                <option selected>Role</option>
                                <option value="0">Admin</option>
                                <option value="1">Assistance</option>
                            </select>
                        </div>
                    </div>
                </DialogModal.Content>
                <DialogModal.Footer>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={closeModal}>
                        Cancel
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold ms-2 py-2 px-4 rounded"
                        onClick={adduser}
                    >
                        add
                    </button>
                </DialogModal.Footer>
            </DialogModal>
        </>
    )
}

export default Adduser