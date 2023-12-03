import React, {FC, useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import { ICity } from '../../models/ICity';
import s from "../City/City.module.sass"
import Area from '../Area/Area';
import { IArea } from '../../models/IArea';
import ContentService from '../../services/ContentService';
import { IProduct } from '../../models/IProduct';

interface Props {
    product: IProduct
    removeProduct: (id:string) => void
    imit?: boolean
    addProduct?: (name:string, price:string) => void
}

const City: FC<Props> = ({product, removeProduct, imit, addProduct}) => {
    const {store} = useContext(Context);

    const [productName, setProductName] = useState<string>("")
    const [productPrice, setProductPrice] = useState<string>("")


    if(imit) return (
        <div className={s.ContainerContainer}>
            <div className={s.ContainerWrapper}>
                <div className={s.WrapperSegment}>
                    <div className={s.ContainerHeader}>
                        #{productName}
                    </div>
                    <div className={s.ContainerBody}>
                        <div className={s.ContainerInfo}>
                            <div className={s.ContainerInfoValue}>
                                <input placeholder="Enter new product name" className={s.ImitInput}  onChange={e => setProductName(e.target.value)}/>
                                <input placeholder="Enter new product price" className={s.ImitInput}  onChange={e => setProductPrice(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.ControllsWrapper}>
                    <button className={s.ControllsBtn} onClick={() => addProduct!(productName, productPrice)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
                            <path fillRule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"/>
                        </svg>
                    </button>

                </div>
            </div>
        </div>
    )

    return (
        <div className={s.ContainerContainer}>
            <div className={s.ContainerWrapper}>
                <div className={s.WrapperSegment}>
                    <div className={s.ContainerHeader}>
                        #{product.hash_name}
                    </div>
                    <div className={s.ContainerBody}>
                        <div className={s.ContainerInfo}>
                            <div className={s.ContainerInfoValue}>
                                {product.name} - {product.price}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.ContainerDropdown}>
                     
                    <button className={s.DropdownInit} onClick={() => removeProduct(product.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default observer(City);
