import React, {FC, useContext, useEffect, useState} from 'react';
import AuthPage from "./pages/AuthPage/AuthPage";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import CityPanel from './pages/CityPanel/CityPanel';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Header from './components/Header/Header';
import ProductPanel from './pages/ProductPanel/ProductPanel';
import PurchasePanel from './pages/PurchasePanel/PurchasePanel';

const router = createBrowserRouter([
    {
        errorElement: <h1>ERROR:/</h1>,
        children: [
            {
                path: "/city",
                element: <CityPanel/>
            }, 
            {
                path: "/product", 
                element: <ProductPanel/>
            }, 
            {
                path: "/order",
                element: <PurchasePanel/>
            },
            {
                path: "/", 
                element: <Navigate to="/product"/>
            }
        ]
    }
])

const App: FC = () => {
    const {store} = useContext(Context);

    useEffect(() => {
        store.verifyAccess(localStorage.getItem('token')!)
    }, [])

    if (store.isLoading) {
        return <div>Загрузка...</div>
    }

    if (!store.isAuth) {
        return (
            <div>
                <AuthPage/>
            </div>
        );
    }

    return (
        <div>
            <div className="background"></div>
            <Header/>
            <RouterProvider router={router}/>
        </div>
    );
};

export default observer(App);