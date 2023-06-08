import React, { useState, useEffect } from 'react'
import axiosClient from '../../axios-client'
import { Link } from 'react-router-dom';

function Fournisseur() {
    const [dataF, setDataF] = useState({})
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [order, setOrder] = useState("id");
    const [DESC, setDESC] = useState(false);
    const [maxRows, setMaxRows] = useState(10)

    const handleMaxRowsChange = (event) => {
        setMaxRows(parseInt(event.target.value));
        console.log(maxRows)
    }

    const getData = () => {
        axiosClient.get(`/fournisseur?page=${page}&q=${query}&order=${order}&DESC=${DESC}&row=${maxRows}`)
            .then(reponse => setDataF(reponse.data))
    }
    useEffect(() => {
        getData()
    }, [page, query, order, DESC, maxRows]);


    const fetchNextPrevTasks = (link) => {
        if (link) {
            const url = new URL(link);
            //  console.log(link)
            setPage(url.searchParams.get("page"));
        }
    };

    const f_ordre = (p) => {
        if (order === p) {
            setDESC((D) => !D);
        } else {
            setDESC(false);
        }
        setOrder(p);
    };
    const deletfact = (factDelet) => {
        axiosClient.delete(`/Facture/${factDelet}`).then(Response => getData())
    }
    const RenderPaginationLinks = () => {
        function getActive(active) {
            if (active) {
                return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded dark:hover:bg-white  dark:focus:text-dark bg-primary focus:text-primary bg-blue-700 text-white";
            } else {
                return "mr-1 mb-1  items-center px-4 py-3 text-sm leading-4 border rounded  hover:bg-white  focus:border-primary focus:text-primary";
            }
        }


        return (
            <div className="mb-4">

                <div className="flex  justify-center mt-8 j ">
                    {dataF?.links?.map((link, index) => (
                        <button
                            type="button"
                            className={`mr-1 mb-1 px-4 py-3 text-sm leading-4 dark:text-gray-400 border rounded cursor-pointer  ${getActive(
                                link.active
                            )}`}
                            key={index}
                            onClick={() => fetchNextPrevTasks(link.url)}
                            disabled={link.active}
                        >
                            {link.label.replace("&laquo;", "").replace("&raquo;", "")}
                        </button>
                    ))}
                </div>
            </div>
        );
    };


    return (
        <div className='w-full h-full'>
            <div className="relative overflow-x-auto shadow-md  sm:rounded-lg  ">
                <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
                    <div className="mb-1 w-full">
                        <div className="mb-4">
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Tous les factures</h1>
                        </div>
                        <div className="sm:flex">
                            <div className="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
                                <div className="lg:pr-3">
                                    <label htmlFor="users-search" className="sr-only">Search</label>
                                    <div className="mt-1 relative lg:w-64 xl:w-96">
                                        <input type="text" value={query}
                                            onChange={(event) => setQuery(event.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Search for users" />
                                    </div>
                                </div>
                                <div className="flex space-x-1 pl-0 sm:pl-2 mt-3 sm:mt-0">
                                    <a href="#" className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
                                    </a>
                                    <a href="#" className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                    </a>
                                    <a href="#" className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                    </a>
                                    <a href="#" className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                                <Link to={"/addfacture"} data-modal-toggle="add-user-modal" className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
                                    <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                    Ajouter Fournisseur
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>



                <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4 ">
                                <div className="flex items-center ps-4">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th
                                scope="col"
                                className={`px-6 py-3 cursor-pointer ${order === "numero_fact"
                                    ? "    dark:border-gray-300 text-black"
                                    : ""
                                    }`}
                                onClick={() => {
                                    f_ordre("nom");
                                }}
                            >
                                {" "}
                                ID
                                {order === "ICE" ? (
                                    <span>
                                        {DESC ? (
                                            <i className=" px-2 fa-solid fa-caret-up"></i>
                                        ) : (
                                            <i className=" px-2 fa-solid fa-caret-down"></i>
                                        )}
                                    </span>
                                ) : <i className="fa-solid fa-sort"></i>}
                            </th>
                           
                            <th scope="col" className="px-6 py-3 text-center">
                                ICE
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Nom
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Adresse
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Tél
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Fix
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3 text-center ">
                                Nomber Facture
                            </th>
                            <th scope="col" className="px-6 py-3 flex justify-center">
                                ACTION
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataF?.data?.map((f, index) =>

                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4">
                                    <div className="flex items-center ps-4">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {f.id}
                                </th>
                                <td className="px-6 py-4 text-center">
                                    {f.ICE}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {f.nom}
                                </td>
                               
                                <td className="px-6 py-4 text-center">
                                    {f.adreasse}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {f.tel}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {f.fix} 
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {f.email}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {f.nombreFacture}
                                </td>
                                <td className="px-6 py-4 flex justify-center  ">

                                    <button type="button" data-modal-toggle="user-modal" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 me-2 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                        <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                                        Edit
                                    </button>

                                    <button onClick={() => deletfact(f.id)} type="button" data-modal-toggle="delete-user-modal" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                        <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        )
                        }
                    </tbody>
                </table>
                <RenderPaginationLinks />
            </div>

        </div>
    )
}

export default Fournisseur
