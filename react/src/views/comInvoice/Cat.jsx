//import "./styles.css";
import React, { useState,useEffect } from "react";
import Select from "react-select";


import axiosClient from "../../axios-client";


export default function App({Type_F=23,setType_F}) {

const [charge,setCharge]=useState(null);

const [id_CG,setId_CG]=useState(null);
const [type_ch,setType_ch]=useState(null);



const [categorie,setCategorie]=useState(null);
const [soucategorie,setSouategorie]=useState(Type_F);


const [categoriesdata,setCategoriesdata]=useState([]);
const [soucategoriesdata,setSoucategoriesdata]=useState([]);

const charges = [
    { value: 2, label: "Immobilisation" },
    { value: 1, label: "Service - Travaux" }
  ];


const [categories,setCategories]=useState([]);
const [soucategories,setSouategories]=useState([]);




/*

const [categoriesLoading,setCategoriesLoading]=useState(false);
const [soucategoriesLoading,setSouategoriesLoading]=useState(false);
*/

const getCategorie = async () => {
  const response = await axiosClient.get(`/categorie`);
  setCategoriesdata(response.data)
  //console.log(response.data);
};
const getsoucategorie = async () => {
  const response = await axiosClient.get(`/souscategorie`);
  setSoucategoriesdata(response.data)
  //console.log(response.data);
};


useEffect(()=>{
  getsoucategorie();
  getCategorie();
},[])

/*
useEffect(()=>{
console.log(soucategories.filter(s => s.id_CG==id_CG ).map(e=> ({'value': e.id, 'label': e.intitule_SC , 'id_CG':e.id_CG})) )

},[soucategories])
useEffect(()=>{
  if(Type_F){
    setId_CG(soucategoriesdata.find(s => s.id_CG === Type_F)?.id_CG)
  console.log(soucategoriesdata.find(s => s.id_CG === Type_F)?.id_CG)  
    setType_ch(categoriesdata.find( c=> c.id === id_CG )?.type) 
  }
  if (type_ch){
    setCharge(charges.find(c => c.value == type_ch ));
    setCategorie(categoriesdata.map(e=> ({'value': e.id, 'label': e.intitule_CG,'type':e.type})).find( c => c.id == id_CG))
  }


},[Type_F])
useEffect(()=>{
  console.log(categories)
},[categories])


useEffect(()=>{
  //charge&&setCategories(soucategoriesdata.filter( c => c.type==charge))
  console.log(soucategoriesdata.filter( c => c.type==charge))
},[Type_F])
*/


const handleChargeChange=(obj) => {    
setCharge(obj);
setCategorie([])

if (obj) {
        setCategories(categoriesdata.filter( e=> obj.value!=null&& e.type==obj.value))
    }else {
        setCategorie(null)
        setCategories([])
    }
    setSouategorie(null);
  };
  


  const handletCategorieChange=(obj) => {
    setCategorie(obj)
    //console.log(obj)
    setSouategorie(null);
      if (obj) {
        ///console.log(soucategoriesdata.filter(s => s.id_CG==obj.value ))
        setSouategories(soucategoriesdata.filter(s => s.id_CG==obj.value ))

      }
      else
      {
        setSouategorie(null)
        setSouategories([])
      }
  
  
    }
    const handletSouCategorieChange=(obj) => {
      setSouategorie(obj);
      if(obj){
        setType_F(obj.value)
      }else{
        setType_F(null)
      }
      //console.log(obj)
      };



/*




  */



  return (
    <>


     
      <Select
        value={charge}
        isClearable={true}
        options={charges}
        onChange={handleChargeChange}
        //isLoading={false}

      />
      <Select
        value={categorie}
        isClearable={true}
        options={
          categories?.map(e=> ({'value': e.id, 'label': e.intitule_CG,'type':e.type}))
        }
        onChange={handletCategorieChange}
       // isDisabled={!charge}
        //isLoading={categoriesLoading}

      />
      <Select
      //value={soucategorie}
          isClearable={true}
          options={
          soucategories.map(e=> ({'value': e.id, 'label': e.intitule_SC , 'id_CG':e.id_CG}))
        }
       onChange={handletSouCategorieChange}
      //  isDisabled={!categorie}
       // isLoading={soucategoriesLoading}

   
      />


    </>
  );
}
