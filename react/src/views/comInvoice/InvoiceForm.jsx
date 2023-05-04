import React, { useState } from 'react';
import { uid } from 'uid';
import InvoiceItem from './InvoiceItem';
//import InvoiceModal from './InvoiceModal';
//import incrementString from '../helpers/incrementString';
import axiosClient  from '../../axios-client';
import Fournisseur from "./Fournisseur"
import Categorie from "./Cat"
const date = new Date();


export default function InvoiceForm() {

  const [data_F,setDate_F]=useState('')
  const [tva, setTva] = useState(20);
  const [fournisseur_id, setFournisseur_id] = useState(12);
  const [souscategorie_id, setSousCategorie_id] = useState(null);
  const [description_F, setDescription_F] = useState(null);
  const [classeur_F, setClasseur_F] = useState(null);
  const [filepdf, setFilepdf] = useState();

  const [invoiceNumber, setInvoiceNumber] = useState();
  const [items, setItems] = useState([
    {
      id: "1",
      description: '',
      quantite: 1,
      pu: '1.00',
    },
  ]);

  const sendPostRequest = async () => {

}

  const reviewInvoiceHandler = async (event) => {
    event.preventDefault();
    //setIsOpen(true);
    
    try {
      const resp = await axiosClient.post('/Facture', {
        "date_fact": data_F,
        "numero_fact": invoiceNumber,
        "TVA": tva,
        "id_fournisseur": fournisseur_id,
        "sousCategorie": souscategorie_id,
        "classeur": classeur_F,
        items,
        "description":description_F,
        filepdf
  
      });
      console.log(resp.data);
      setDate_F(null)
      setTva(20)
      setFournisseur_id(null)
      setSousCategorie_id(null)
      setDescription_F(null)
      setClasseur_F(null)
      setFilepdf(null)
      setItems([])
      setInvoiceNumber(null)

  } catch (err) {
      console.error(err);
  }

  };



  const addItemHandler = () => {
    const id = uid(6);
    setItems((prevItem) => [
      ...prevItem,
      {
        id: id,
        description: '',
        quantite: 1,
        pu: '1.00',
      },
    ]);
  };

  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };

  const edtiItemHandler = (event) => {
    const editedItem = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };

    const newItems = items.map((items) => {
      for (const key in items) {
        if (key === editedItem.name && items.id === editedItem.id) {
          items[key] = editedItem.value;
        }
      }
      return items;
    });

    setItems(newItems);
  };

  const subtotal = items.reduce((prev, curr) => {
    if (curr.description.trim().length > 0)
      return prev + Number(curr.pu * Math.floor(curr.quantite));
    else return prev;
  }, 0);
  const tvaRate = (tva * subtotal) / 100;
  const total = subtotal + tvaRate;

  return (
    <form
      className="relative flex flex-col px-2 md:flex-row"
      onSubmit={reviewInvoiceHandler}
    >
      <div className="my-6 flex-1 space-y-2  rounded-md bg-white p-4 shadow-sm sm:space-y-4 md:p-6">
        <div className="flex flex-col justify-between space-y-2 border-b border-gray-900/10 pb-4 md:flex-row md:items-center md:space-y-0">
          <div className="flex space-x-2">
            <label className="flex items-center font-bold">Date de facture : </label>
            <input type="date" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={(e)=>setDate_F(e.target.value)} value={data_F} />
          </div>

          <div className="flex items-center space-x-2">
            <label className="flex items-center font-bold" htmlFor="invoiceNumber">
                Numéro de facture:
            </label>
            <input
              required
              placeholder='########'
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="invoiceNumber"
              id="invoiceNumber"

              value={invoiceNumber||''}
              onChange={(event) => setInvoiceNumber(event.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <label className="flex items-center font-bold">Classeur de facture : </label>
            <input type="text" 
             placeholder='20##/##/??'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={(e)=>setClasseur_F(e.target.value)} value={classeur_F||''} />

          </div>

        </div>
        <h1 className="text-center text-lg font-bold">Facture:</h1>
        <div className="grid grid-cols-3 gap-2 pt-4 pb-8">
            <Fournisseur Fournisseur_F={fournisseur_id}  setIDF={setFournisseur_id} />
        </div>
        <div className="grid grid-cols-3 gap-2 pt-4 pb-8">
            <Categorie  setType_F={setSousCategorie_id}  Type_F={souscategorie_id}/>
        </div>
        <table className="w-full p-4 text-left">
          <thead>
            <tr className="border-b border-gray-900/10 text-sm md:text-base">
              <th>Description</th>
              <th>Quantite</th>
              <th className="text-center">prix unitaire</th>
              <th className="text-center">option</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <InvoiceItem
                key={item.id}
                id={item.id}
                description={item.description}
                quantite={item.quantite}
                pu={item.pu}
                onDeleteItem={deleteItemHandler}
                onEdtiItem={edtiItemHandler}
              />
            ))}
          </tbody>
        </table>
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
          type="button"
          onClick={addItemHandler}
        >
          Ajouter un nouvel élément
        </button>
        <div className="flex flex-col items-end space-y-2 pt-6">
        <input
        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type='number'
                required
              value={tva}
              onChange={(event) => setTva(event.target.value)}
            />
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Subtotal:</span>
            <span>dh {subtotal.toFixed(2)}</span>
          </div>

          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">TVA:</span>
            <span>
              (
                {tva || '0'}%
                
                ) dh {tvaRate.toFixed(2)}
            </span>
          </div>
          <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
            <span className="font-bold">Total:</span>
            <span className="font-bold">
             dh {total % 1 === 0 ? total : total.toFixed(2)}
            </span>
          </div>
        </div>


        <div className="mb-3">
  <label
    htmlFor="formFile"
    className="mb-2 inline-block text-neutral-700 dark:text-neutral-200">
      Télécharger une facture :
    </label>
  <input
    className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
    type="file"
    accept="application/pdf"
    onChange={event=>setFilepdf(event.target.files[0])}
    id="formFile" />
</div>

<div className='grid  gap-2 pt-4 pb-8'>
        <label  className="fw-bold form-label">Remarques :</label>
        <textarea onChange={(e)=>setDescription_F(e.target.value)} 
        placeholder="Remarques !!!"
        name="notes" cols="1" rows="4" 
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {description_F}
        </textarea>

</div>


        <button
            className="w-full rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
            type="submit"
          >
            Review Invoice
          </button>
      </div>

    </form>
  );

};
