import React, { useEffect, useState } from 'react'

import axiosClient from '../../axios-client'
function TableFournisseurDasboard() {
  const [dataF, setDataF] = useState([])
  const getData = () => {
    axiosClient.get(`/fournisseurAndNbrFactute`)
      .then(reponse => setDataF(reponse.data))
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='mt-20'>

      <div className="flex flex-col">
        <div className="-m-1.5 overflow-y-auto h-96  ">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700  " >
                <caption className="py-2 text-left text-sm text-gray-600 dark:text-gray-500">List of fournisseur</caption>
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ICE</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">nom</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">email</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Nombre Facture</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {dataF.map((fournisseur, key) =>
                    <tr key={key}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{fournisseur.ICE}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{fournisseur.nom}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{fournisseur.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"> {fournisseur.nombreFacture}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TableFournisseurDasboard