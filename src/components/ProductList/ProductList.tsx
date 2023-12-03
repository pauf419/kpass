

import React, {FC, useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import s from "./ProductList.module.sass"
import ContentService from '../../services/ContentService';
import { IProduct } from '../../models/IProduct';
import Product from '../Product/Product';
import cs from "../CityList/CityList.module.sass"

interface Props {
    products: IProduct[]
}

const CityList: FC<Props> = ({products}) => {
    const {store} = useContext(Context);

    const [productState, setProductState] = useState<IProduct[]>([])
    const [productDialogActive, setProductDialogActive] = useState<boolean>(false)

    useEffect(() => {
        setProductState(products)
    }, [products])

    const removeProduct = async (id:string): Promise<void> => {
        ContentService.removeProduct(id)
        setProductState(prevState => {
            return prevState.filter(e => e.id !== id)
        })
    }

    const addProduct = async (name:string, price:string): Promise<void> => {
        const response = await ContentService.addProduct(name, price)
        const city:IProduct = response.data.data
        setProductState(prevState => {
            prevState.push(city)
            return [...prevState]
        })
        setProductDialogActive(false)
    }

    return (
        <div className={`${cs.CityListWrapper} ${s.ProductListWrapper}`}>
            {
                productState.map(el => <Product product={el} removeProduct={removeProduct}/>)
            }
            <div className={`${cs.CityAddWrapper} ${productDialogActive ? cs.CityAddWrapperActive : ""}`}>
                {
                    productDialogActive
                        ? 
                            <Product product={{} as IProduct}  removeProduct={removeProduct} imit={true} addProduct={addProduct}/>
                        :
                        <button className={cs.AddCityBtn} onClick={() => setProductDialogActive(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                        </button>
                }
            </div>
        </div>
    );
};

export default observer(CityList);
