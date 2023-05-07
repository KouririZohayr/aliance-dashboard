import React from 'react'
import TableDasboard from '../dashboard/TableDasboard'
import Card from '../dashboard/Card'
import Chartjs1 from '../dashboard/Chartjs1'
import DoughnutChart from '../dashboard/DoughnutChart'

function Dashboard(){
   
  return (
  <>   {/* <Sidebr> */}
     <div className='  '>
            <div className='grid grid-cols-4 md:grid-cols-4 sm:grid-cols-2 max-sm:grid-cols-1 gap-5 p-2'>
                    <Card />
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