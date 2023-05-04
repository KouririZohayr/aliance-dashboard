import { useState,useEffect } from 'react';


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axiosClient from '../../axios-client';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default function Chartjs1(){
  
const [datast,setDataSt]=useState([])
const [year,setYear]=useState(new Date().getFullYear())

useEffect(()=>{
  axiosClient.get(`/statistique/?year=${year}`).then((repons)=>setDataSt(repons.data))
},[])


const colors =["#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"]
const labels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

 const data = {
  labels ,
  
  datasets:
    datast.map((chart)=>({
      label : chart.label ,
      data : chart.data.map((value)=>
         value.VALUE_mois || 0 
      ),
      backgroundColor:colors.map((valColor)=>valColor),
      borderColor :colors.map((valColor)=>valColor),
      hidden: chart.data.map((value)=>
       value.VALUE_mois
        ).reduce( (accumulator, currentValue) => accumulator + currentValue )===0?true:false,
      })),
}; 
  return(<div className='bg-white p-6 border rounded-md shadow-md dark:border-gray-800 dark:bg-gray-800 '>
           <Line  data={data} />
        </div>
        )
}
 
