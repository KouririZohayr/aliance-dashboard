//import "./styles.css";
import React, { useState, useEffect } from "react";
import Select from "react-select";


import axiosClient from "../../axios-client";
import axios from "axios";


export default function App({Type_FF = null, setType_F }) {

  const [charge, setCharge] = useState(null);

  const [id_CG, setId_CG] = useState(null);
  const [type_ch, setType_ch] = useState(null);



  const [categorie, setCategorie] = useState(null);
  const [soucategorie, setSouategorie] = useState(null);



  const [categoriesdata, setCategoriesdata] = useState([]);
  const [soucategoriesdata, setSoucategoriesdata] = useState([]);

  const charges = [
    { value: 2, label: "Immobilisation" },
    { value: 1, label: "Service - Travaux" }
  ];


  const [categories, setCategories] = useState([]);
  const [soucategories, setSouategories] = useState([]);





  const getCategorie = async () => {
    const response = await axiosClient.get(`/categorie`);
    setCategoriesdata(response.data)
    //console.log(response.data);
  };
  const getsoucategorie = async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/souscategorie`);
    setSoucategoriesdata(response.data)
    //console.log(response.data);
  };



  useEffect(() => {

    getsoucategorie();
    getCategorie();

  }, [])

  useEffect(() => {
    if(soucategoriesdata.length && categoriesdata.length ){
      f_ff();
      //console.log(id_CG,type_ch)
    }
  },[soucategoriesdata,categoriesdata])

  useEffect(() => {
    if(id_CG && type_ch && Type_FF){
      console.log(id_CG,type_ch)
setCharge(charges.find(c => c.value == type_ch))
handleChargeChange(charges.find(c => c.value == type_ch))
setCategorie(categoriesdata?.map(e => ({ 'value': e.id, 'label': e.intitule_CG, 'type': e.type })).find( ca => ca.value==id_CG ))
handletCategorieChange(categoriesdata?.map(e => ({ 'value': e.id, 'label': e.intitule_CG, 'type': e.type })).find( ca => ca.value==id_CG ))
setSouategorie(soucategoriesdata.map(e => ({ 'value': e.id, 'label': e.intitule_SC, 'id_CG': e.id_CG })).find( s=> s.value == Type_FF))
    }
  },[id_CG,type_ch])

  const handleChargeChange = (obj) => {
    setCharge(obj);
    setCategories([])
    setCategorie(null)
    if (obj) {
      setCategories(categoriesdata.filter(e => obj.value != null && e.type == obj.value)?.map(e => ({ 'value': e.id, 'label': e.intitule_CG, 'type': e.type })))
    } else {
      setCategorie(null)
      setCategories([])
    }

    setSouategorie(null);
  };



  const handletCategorieChange = (obj) => {
    setCategorie(obj)
    //console.log(obj)
    setSouategorie(null);
    if (obj) {
      ///console.log(soucategoriesdata.filter(s => s.id_CG==obj.value ))
      setSouategories(soucategoriesdata.filter(s => s.id_CG == obj.value).map(e => ({ 'value': e.id, 'label': e.intitule_SC, 'id_CG': e.id_CG })))

    }
    else {
      setSouategorie(null)
      setSouategories([])
    }


  }
  const handletSouCategorieChange = (obj) => {
    setSouategorie(obj);
    if (obj) {
      setType_F(obj.value)
    } else {
      setType_F(null)
    }
  };

function f_ff(){
if (Type_FF){
  setId_CG(soucategoriesdata.find(s => s.id === Type_FF)?.id_CG)
  setType_ch(id_CG&&categoriesdata.find( c=> c.id === id_CG )?.type)
   //console.log(id_CG,id_ch)
}


}

  return (
    <>



      <Select
        value={charge}
        isClearable={true}
        options={charges}
        onChange={handleChargeChange}
      isLoading={soucategoriesdata.length == 0 && categoriesdata.length == 0}
      required={true}
      />
      <Select
        value={categorie}
        isClearable={true}
        options={
          categories
        }
        onChange={handletCategorieChange}
      isDisabled={!charge}
      required={true}

      />
      <Select
        value={soucategorie}
        isClearable={true}
        options={
          soucategories
        }
        onChange={handletSouCategorieChange}
        isDisabled={!categorie}
        required={true}



      />


    </>
  );
}
