import {FC, useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import ContentService from '../../services/ContentService';
import s from "./ProductPanel.module.sass"
import { IProduct } from '../../models/IProduct';
import ProductList from '../../components/ProductList/ProductList';

const CityPanel: FC = () => {
    const {store} = useContext(Context);

    const [products, setProducts] = useState<IProduct[]>([])


    const loadProducts = async(): Promise<void> => {
        const response = await ContentService.getProducts();
        setProducts(response.data.data)
    }

    useEffect(() => {
        loadProducts()
    }, [])

    return (
        <div className={s.ProductPanelWrapper}>
            <ProductList products={products}/>
        </div>
    );
};

export default observer(CityPanel);
