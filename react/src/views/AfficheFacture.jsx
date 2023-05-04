import React,{useEffect ,useState} from 'react'
import axiosClient from '../axios-client'
function AfficheFacture() {
    const [data,setData]=useState({})
    const [ttc , setTtc] =useState(0)

   /*  const  getData=()=>{ 
         axiosClient.get('/Facture/{21}').then(reponse=>setData(reponse.data)) 
    } */
    async function fetchData() {
        let response = await axiosClient.get('Facture/21');
        let data = await response.data;
        setData(data);
      }
    useEffect(()=>{
        fetchData()
        total()
    },[])

  
    const total=()=>{
        let ht=0
        data.LigneFactures?.map((val)=>{
             ht=ht+(parseFloat(val.pu)*parseFloat(val.quantite))
             setTtc(ht)
        })
        
    }
  

   



  return (
    <div className='flex justify-center align-items-center h-full  '>
        <div className=' container mx-auto h-full  md:w-4/6 bg-gray-200 p-10 xl:w-4/6 lg:w-4/6   '>
        <div className='flex justify-between  '>
            <div>
            <h1 className='mb-4 text-3xl font-extrabold  tracking-tight text-gray-900   dark:text-white' > Facture N° {data.facture?.numero_fact} </h1>  
            </div>
            <div>
                <div className='mt-16'>{/* fournisseur info */}
                    <h1 className=' text-3xl  text-right font-bold   tracking-tight text-gray-900   dark:text-white'>{data.fournisseur?.nom}</h1>
                    <h2 className=' text-1xl  text-right  tracking-tight text-gray-900   dark:text-white'>Fournisseur  ICE {data.fournisseur?.ICE} </h2>
                    <p className=' text-lg text-right   tracking-tight text-gray-900   dark:text-white'> {data.fournisseur?.adreasse}</p>
                    <p className=' text-md text-right  tracking-tight text-gray-900   dark:text-white'>Tel : {data.fournisseur?.tel}</p>
                </div> 
            </div>
        </div> 
        <div>
            <h2 className='mb-4 text-1xl   font-bold  tracking-tight text-gray-900   dark:text-white'>FACTURER</h2>
        </div>
        <div>
            <h1 className='text-xl   font-bold  tracking-tight text-gray-900   dark:text-white'>ALLIANCE FRANCAISE DE SAFI</h1>
            <p className='mb-4 text-md  w-60    tracking-tight text-gray-900   dark:text-white'>
            BD.ZARKTOUNI-46000 SAFI MAROC TEL: 05 24 62 79 46 ICE : 002096175000059
            </p>
        </div>
        <div>
          
<div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-28 border-b-1 ">
    <h1 className='text-xl   font-bold  tracking-tight text-gray-900   dark:text-white mb-5'>Lignes de facture</h1>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    N°
                </th>
                <th scope="col" class="px-6 py-3">
                    designation
                </th>
                <th scope="col" class="px-6 py-3">
                    Quantité
                </th>
                <th scope="col" class="px-6 py-3">
                    prix unitaire
                </th>
                <th scope="col" class="px-6 py-3">
                    total HT
                </th>
            </tr>
        </thead>
           {data.LigneFactures?.map((val , key)=>{
            return( 
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {key+1}
                </th>
                <td class="px-6 py-4">
                    {val.description} 
                </td>
                <td class="px-6 py-4">
                    {val.quantite}
                </td>
                <td class="px-6 py-4">
                    {val.pu} DH
                </td>
                <td class="px-6 py-4">
                    {val.pu*val.quantite} DH
                </td>
            </tr>
        </tbody>
        ) }) }       
    </table>
</div> 
<div class="py-8 ml-auto mt-5 w-full sm:w-3/4 lg:w-1/4">
			<div class="flex justify-between mb-3">
            <div class="text-right w-40">
					<div class="text-gray-800 font-medium" >{ttc} DH</div>
				</div>
				<div class="text-gray-800 text-right flex-1"> : Mantant Total HT </div>

			</div>
			<div class="flex justify-between mb-4">
            <div class="text-right w-40">
					<div class="text-sm text-gray-600" >{data.facture?.TVA}  %</div>
				</div>
				<div class="text-sm text-gray-600  text-right flex-1">: TVA</div>
				
			</div>
			<div class="py-2 border-t border-b">
				<div class="flex justify-between">
                <div class="text-right w-40">
						<div class="text-xl text-gray-800 font-bold" x-html="netTotal"> {ttc*data.facture?.TVA/100+ttc} DH</div>
					</div>
					<div class="text-xl text-gray-600 text-right flex-1">: Prix TTC</div>
					
				</div>
			</div>
		</div>

        </div>
    </div>
    </div>
    
  )
} 

export default AfficheFacture