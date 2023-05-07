import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider.jsx";
import Adduser from "./Adduser.jsx";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext()

    useEffect(() => {
        getUsers();
    }, [])


    const onDeleteClick = userid => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return
        }
        axiosClient.delete(`/users/${userid}`)
            .then(() => {
                setNotification('User was successfully deleted')
                getUsers()
            })
    }

    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users')
            .then(({ data }) => {
                setLoading(false)
                setUsers(data.data)
               
            })
            .catch(() => {
                setLoading(false)
            })
    }

    return (
        <div className="container mx-auto">
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <h1>Users</h1>
                <Adduser getUsers={getUsers} />
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                        <tr>

                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                role
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Create
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>

                        </tr>
                    </thead>
                    {loading &&
                        <tbody>
                            <tr>
                                <td colSpan="5" className="px-6 py-4">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    }
                    {!loading &&
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {u.id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {u.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {u.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {u.role ? 'admin' : 'Assistance'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {u.created_at}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link className="font-medium text-blue-600 dark:text-blue-500 me-4 hover:underline" to={'/users/' + u.id}>Edit</Link>
                                        <button onClick={() => onDeleteClick(u.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline" >Supprimer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    }
                </table>
            </div>
        </div>
    )
}
