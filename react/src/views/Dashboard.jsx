import React,{useState} from 'react'
import TableDasboard from './dashboard/TableDasboard'
import Card from './dashboard/Card'
import Chartjs1 from './dashboard/Chartjs1'
import DoughnutChart from './dashboard/DoughnutChart'
import {MdMiscellaneousServices} from "react-icons/md"
import {FcCurrencyExchange} from "react-icons/fc"
import {DiMaterializecss} from "react-icons/di"
/* import Sidebr from './Sidebr' */
function Dashboard(){
    const [topComponenet , setTopComponent]=useState([
        {
            name : "charge non stockable",
            icon : <FcCurrencyExchange size={30} />,
            Mantant : 25547
        },
        {
            name : "Services",
            icon : <MdMiscellaneousServices size={30} />,
            Mantant : 85556.20
        },
        {
            name : "Material",
            icon : <DiMaterializecss size={30} />,
            Mantant : 44778

        },
        {
            name : "Material",
            icon : <DiMaterializecss  size={30}/>,
            Mantant : 777824
        }
    ])
  return (
  <>   {/* <Sidebr> */}
     <div className='  '>
            <div className='grid grid-cols-4 md:grid-cols-4 sm:grid-cols-2 max-sm:grid-cols-1 gap-5 p-2'>
                {topComponenet.map((val, key)=>
                    <div id={key} ><Card title={val.name} icon={val.icon} mantant={val.Mantant}/></div>
                )}
            </div>
            <div className='grid grid-cols-3 md:grid-cols-3 sm:grid-cols-1 max-sm:grid-cols-1 gap-5 p-2'>
                <div className='col-span-2'>
                    <Chartjs1/>
                </div>
                <div>
                    <DoughnutChart />
                </div>
            </div>
            <h2 className="text-lg ps-2 font-bold dark:text-white">Factures</h2>
        
            <div className=''>
                <TableDasboard />
            </div>
    
        </div>
 {/*  </Sidebr> */}
       
  </>
  )
}

export default Dashboard