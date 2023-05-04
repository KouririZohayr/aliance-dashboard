import React from 'react'
import TableDasboard from './TableDasboard'
import Card from './Card'
import Chartjs1 from './Chartjs1'
import DoughnutChart from './DoughnutChart'
/* import Sidebr from './Sidebr' */
function Dashboard(){
  return (
  <>   {/* <Sidebr> */}
     <div className='container mx-auto  '>
            <div className='grid grid-cols-4 md:grid-cols-4 sm:grid-cols-2 max-sm:grid-cols-1 gap-5 p-2'>
                <div><Card/></div>
                <div><Card/></div>
                <div><Card/></div>
                <div><Card/></div>
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
        
            <div className='p-2'>
                <TableDasboard />
            </div>
    
        </div>
 {/*  </Sidebr> */}
       
  </>
  )
}

export default Dashboard