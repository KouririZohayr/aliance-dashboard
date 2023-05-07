import React, { useState, useEffect } from 'react'
import axiosClient from '../../axios-client'
function Archives() {
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
        axiosClient.get(`/FactureArchive?page=${page}&q=${query}&order=${order}&DESC=${DESC}&row=${maxRows}`)
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
    const recuperer = (factDelet) => {
        axiosClient.post("/Facturerecuperer", { factDelet }).then(Response => getData())
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

                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Tous les factures archivés</h1>
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
                                    f_ordre("numero_fact");
                                }}
                            >
                                {" "}
                                Numero Facture
                                {order === "numero_fact" ? (
                                    <span>
                                        {DESC ? (
                                            <i className=" px-2 fa-solid fa-caret-up"></i>
                                        ) : (
                                            <i className=" px-2 fa-solid fa-caret-down"></i>
                                        )}
                                    </span>
                                ) : <i className="fa-solid fa-sort"></i>}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                date_fact
                            </th>
                            <th scope="col" className="px-6 py-3">
                                id_fournisseur
                            </th>
                            <th scope="col" className="px-6 py-3">
                                sousCategorie
                            </th>
                            <th scope="col" className="px-6 py-3">
                                classeur
                            </th>
                            <th scope="col" className="px-6 py-3">
                                TVA
                            </th>
                            <th scope="col" className="px-6 py-3">
                                MONTANT
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
                                    {f.numero_fact}
                                </th>
                                <td className="px-6 py-4">
                                    {f.fournisseur}
                                </td>
                                <td className="px-6 py-4">
                                    {f.numero_fact}
                                </td>
                                <td className="px-6 py-4">
                                    {f.sousCategorieIntitule}
                                </td>
                                <td className="px-6 py-4">
                                    {f.classeur}
                                </td>
                                <td className="px-6 py-4">
                                    {f.TVA} %
                                </td>
                                <td className="px-6 py-4">
                                    {f.totaline} DH
                                </td>
                                <td className="px-6 py-4 flex justify-center  ">
                                    <button onClick={() => recuperer(f.id)} data-modal-toggle="delete-user-modal" className="text-white me-2 bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                        recuperer
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

export default Archives
