

import React, {FC, useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import cs from "../CityList/CityList.module.sass"
import cl from "./PurhcaseList.module.sass"
import { IPurchase } from '../../models/IPurchase';
import Purhcase from '../Purchase/Purchase';

interface Props {
    purchases: IPurchase[]
}

const CityList: FC<Props> = ({purchases}) => {
    const {store} = useContext(Context);

    const [purchaseState, setPurchaseState] = useState<IPurchase[]>(purchases)

    useEffect(() => {
        setPurchaseState(purchases)
    }, [purchases])

    return (
        <div className={`${cs.CityListWrapper} ${cl.PurchaseListWrapper}`}>
            {
                purchaseState.map(el => <Purhcase key={el.id} purchase={el}/>)
            }
        </div>
    );
};

export default observer(CityList);
