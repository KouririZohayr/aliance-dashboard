import React,{useEffect, useState } from 'react'
import {MdMiscellaneousServices} from "react-icons/md"
import {FcCurrencyExchange} from "react-icons/fc"
import {DiMaterializecss} from "react-icons/di"
import axiosClient from '../../axios-client';
function Card() {
  const current = new Date();
  const [data,setData]=useState({})
  const [count , setCount]=useState(0)
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()-1}`;
  useEffect(()=>{
    axiosClient.get('statistique/totalTop')
    .then(Response=>setData(Response.data))
  },[])

  const topComponenet =[
    {
        name : "charge non stockable",
        icon : <FcCurrencyExchange size={30} />,
        mantant :data.chargeNonStocable
    },
    {
        name : "Services",
        icon : <MdMiscellaneousServices size={30} />,
        mantant : data.mobilisationMateriel + data.mobilisationMobilier + data.mobilisatiAmenagements
    },
    {
        name : "services",
        icon : <DiMaterializecss size={30} />,
        mantant : data.services

    },
    {
        name : "Travaux",
        icon : <DiMaterializecss  size={30}/>,
        mantant : data.travaux
    }
]
  return (
    <>
    
        {topComponenet.map((val, key)=>
          <div key={key}> 
       <div className="p-4 transition-shadow border bg-white  dark:border-gray-800 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg">
    <div className="flex items-start justify-between">
      <div className="flex flex-col space-y-2">
        <span className="text-gray-400">{val.name}</span>
        <span className="md:text-3xl lg:text-4xl sm:text-xl text-lg   font-semibold">{val.mantant} DH</span>
      </div>
      <div className="p-10 bg-gray-200 rounded-md">
        {val.icon}
      </div>
    </div>
    <div>
      <span className="inline-block px-2 text-sm text-white bg-green-300 rounded">14%</span>
      <span>from {date}</span>
    </div>
    </div>
  </div>)}
  </>

  )
}

export default Card