import { useState,useEffect } from 'react';
import Select from "react-select";

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

  const charges = [
    { value: 0, label: "Tous" },
    { value: 2, label: "Immobilisation" },
    { value: 1, label: "Service - Travaux" }
  ];

const [datast,setDataSt]=useState([])
const [loading,setLoading]=useState(false)
const [year,setYear]=useState(new Date().getFullYear())
const [charge, setCharge] = useState(charges[0]);
const [type, setType] = useState(0);

useEffect(()=>{
  //setLoading(true)
  axiosClient.get(`/statistique/?year=${year}&type=${type}`).then((repons)=>{setDataSt(repons.data)
    setLoading(false)
  })

},[type,year])


const colors =["#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"]
const labels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' ,
    },
    title: {
      display: true,
      text: `Statistique : ${charge.label} - ${year}`,
    },
  },
};
 const data = {
  labels ,
  datasets:
    datast.map((chart,indexc)=>{
      let r_n=Math.floor(Math.random() * colors.length)
    return {
      label : chart.label ,
      data : chart.data.map((value)=>value.VALUE_mois || 0),
      backgroundColor:colors[indexc],
      borderColor :colors[indexc],
      hidden: chart.data.map((value)=>
       value.VALUE_mois
        ).reduce( (accumulator, currentValue) => accumulator + currentValue )===0?true:false,
      }}),
};

const handleChargeChange = (obj) => {
  setCharge(obj);
  if (obj.value){
    setType(obj.value)
  }else {
    setType(0)
  }
};



  return(


  <div className='bg-white p-6 border rounded-md shadow-md dark:border-gray-800 dark:bg-gray-800  h-full'>
    <div className="grid grid-cols-2 gap-5">
<Select
      value={charge}
      options={charges}
      onChange={handleChargeChange}
    />
<Select
      value={ { value:year, label: year }}
      options={Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map(y => ({label:y,value:y}))}
     onChange={obj=> setYear(obj.value)}
    />
    </div>

    {
      !loading?
      <>
      <Line options={options} data={data} />
      </>
      :<div className="text-left h-full flex
      justify-center
    items-center">
      <div role="status">
          <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
      </div>
  </div>
    }
        </div>
        )
}

