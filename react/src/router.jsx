import {createBrowserRouter, Navigate} from "react-router-dom";
import Dashboard from "./views/Dashboard";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Singup from "./views/Singup";
import Facture from "./views/Facture";
import AddFacture from "./views/AddFacture";
import AfficheFacture from "./views/AfficheFacture";


const router = createBrowserRouter([
  {
      path : '/',
      element :<DefaultLayout/>,
      children :[
          {
              path: '/',
              element: <Navigate to="/dashboard" />
            }, 
          {
              path: '/dashboard',
              element: <Dashboard/>
            },  
            {
              path: '/facture',
              element: <Facture/>
            }, 
            {
              path: '/addfacture',
              element: <AddFacture/>,

            }, 
            {
              path: '/register',
              element : <Singup />
            }, 
            {
              path: '/afficheFacture',
              element : <AfficheFacture />
            },
               
      ]
  },
  {
      path : '/',
      element :<GuestLayout />,
      children :[
          {
              path: '/login' ,
              element :<Login />            
            },
          
      ]
  },
  
  {
    path: "*",
    element: <NotFound/>
  }
])

export default router;
