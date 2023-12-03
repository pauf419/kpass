import {FC, useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import s from "./PurchasePanel.module.sass"
import { IPurchase } from '../../models/IPurchase';
import ContentService from '../../services/ContentService';
import PurchaseList from '../../components/PruchaseList/PurchaseList';

const PurchasePanel: FC = () => {
    const {store} = useContext(Context);

    const [purchases, setPurchases] = useState<IPurchase[]>([])


    const loadPurchases = async (): Promise<void> => {
        const purchases = await ContentService.getPurchases()
        setPurchases(purchases.data.data)
    }

    useEffect(() => {
        loadPurchases()
    }, [])

    return (
        <div className={s.PurchasePanelWrapper}>
            <PurchaseList purchases={purchases}/>
        </div>
    );
};

export default observer(PurchasePanel);
