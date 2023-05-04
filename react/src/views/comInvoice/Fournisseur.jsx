import { useEffect,useState } from "react";
import axiosClient from "../../axios-client";
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';

import DialogModal from './DialogModal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App({Fournisseur_F,setIDF}) {

  const notify = (m) => toast(m);
  
  const [fournisseurdata,setFournisseurdata]=useState([])
const [f_v,setF_v] =useState()
const [f_info,setF_info] =useState(null)
const [form,setForm] =useState({})

const fromgetinput=(e)=>{
  const { name, value } = e.target;
  setForm({ ...form, [name]: value });
}
const inputlist=["ICE","nom","adreasse","tel", "fix","email"]
  const getdata=()=>{
    axiosClient.get(`/fournisseur`).then(reponse=>
    {

      setFournisseurdata(reponse.data)
      console.log(reponse.data)
    }
    
    
    )
  }

  useEffect( () => {
    getdata()
   //console.log(fournisseurdata)
  
  }, []);




const [showaddinterface, setShowaddinterface] = useState(false);

function add_interface() {
  //console.log("add intrfa")
  setShowaddinterface(true);
}
function addfournisseu() {

  //console.log(form)

  const config = {
    onUploadProgress: progressEvent => console.log(progressEvent.loaded)
}
  axiosClient.post(`/fournisseur`,form,config)
  .then(function (response) {
    closeModal()
    getdata()
    console.log(response);
    let ff=response.data
    //console.log(response)
    ///https://fkhadra.github.io/react-toastify/introduction/
    //console.log(fournisseurdata.map(e=> ({'value': e.id, 'label': e.nom})).find(item => item.value==ff))
    //setF_v(fournisseurdata?.map(e=> ({'value': e.id, 'label': e.nom})).find(item => item.value==ff))

    toast.success(`ok ${ff}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  })
  .catch(function (error) {
    console.log(error);
    notify("no")
  });

}
function closeModal() {
  setShowaddinterface(false);
 // setF_v(fournisseurdata.map(e=> ({'value': e.id, 'label': e.nom})).find(item => item.value==16))
  //console.log(fournisseurdata.find(item => item.id==16))

  //setF_v(fournisseurdata.map(e=> ({'value': e.id, 'label': e.nom})).find(item => item.value==16))

    setForm({})
}

const handleCreate = (inputValue) => {

setForm({ ...form, ['nom']: inputValue });
add_interface()
//console.log(inputValue)
//console.log(form)

};

  return (
    <>
      <CreatableSelect
      onCreateOption={handleCreate}
        formatCreateLabel={(value) => <div className="text-center">
        {`Le fournisseur "${value}" n'existe pas,`}
        <br/>
        Cliquez ici pour le créer
        </div>}
        placeholder='Sélectionnez la fournisseur'

       // options={fournisseurdata.map(e=> ({'value': e.id, 'label': e.nom}) )}
        options={fournisseurdata.map(e=> ({'value': e.id, 'label': e.nom}) )}
        isClearable={true}

        /*
        getOptionLabel ={(option)=>option.id}
        getOptionValue ={(option)=>option.nom}
        
        */
        value={f_v}
        onChange={opt=>{
        console.log(opt)
        setF_info(fournisseurdata.find(f=> f.id===opt?.value))
        setF_v(opt)

        setIDF(opt?.value)
      }
      }
      />
      {
        f_info&&
      <div>
        <p> Nom :  {f_info.nom} </p>
        <p> ICE : {f_info.ICE}</p>
        <p> Adreasse :  {f_info.adreasse} </p>
        <p> Tel :  {f_info.tel} </p>
        <p> Email :  {f_info.email} </p>
      </div>
      }
{/*         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
        
        onClick={add_interface}>
          Créer une nouvelle fournisseur
        </button> */}

      <DialogModal isOpen={showaddinterface} onClose={closeModal}>
        <DialogModal.Content title={'Créer une nouvelle fournisseur'}>
{inputlist.map((inpu,index)=>
<div key={index} className="mb-6">
        <label htmlFor={inpu+"_"+index} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{inpu}</label>
        <input 
        onChange={fromgetinput} 
        
        value={form[inpu]||''}
        type="text" name={inpu} id={inpu+"_"+index} className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
</div>
)}
        </DialogModal.Content>
        <DialogModal.Footer>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={closeModal}>
            Cancel
            </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addfournisseu}>
          add
          </button>
        </DialogModal.Footer>
      </DialogModal>
      <ToastContainer />
    </>
  );
}

export default App;
