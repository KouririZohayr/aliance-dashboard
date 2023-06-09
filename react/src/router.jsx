import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./views/pages/Dashboard";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/pages/Login";
import NotFound from "./views/pages/Notfound";
import Singup from "./views/pages/Singup";
import Facture from "./views/pages/Facture";
import AddFacture from "./views/pages/AddFacture";
import AfficheFacture from "./views/pages/AfficheFacture";
import Archives from "./views/pages/Archives";
import Users from "./views/pages/Users";
import Fournisseur from "./views/pages/Fournisseur";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/facture',
        element: <Facture />
      },
      {
        path: '/addfacture/',
        element: <AddFacture />,

      },
      {
        path: '/register',
        element: <Singup />
      },
      {
        path: '/afficheFacture/:idf',
        element: <AfficheFacture />
      },
      {
        path: '/fournisseur',
        element: <Fournisseur />
      },
      {
        path: '/archives',
        element: <Archives />
      },
      {
        path: '/users',
        element: <Users />
      },

    ]
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <Login />
      }

    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
])

export default router;
