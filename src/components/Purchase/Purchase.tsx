import React, {FC, useContext, useState} from 'react';
import {Context} from "../../index";
import s from "../City/City.module.sass"
import cl from "./Purchase.module.sass"
import { IPurchase } from '../../models/IPurchase';

interface Props {
    purchase: IPurchase

}

const Purhcase: FC<Props> = ({purchase}) => {
    const {store} = useContext(Context);

    return (
        <div className={s.ContainerContainer}>
            <div className={s.ContainerWrapper}>
                <div className={s.WrapperSegment}>
                    <div className={s.ContainerHeader}>
                        #{purchase.id} - {purchase.orderid}
                    </div>
                    <div className={s.ContainerBody}>
                        <div className={s.ContainerInfoPurch}>
                            <div className={s.ContainerInfoValue}>
                                <div className={s.ContainerInfoPrefix}>product:</div>{purchase.product.name} - {purchase.product.price}
                            </div>
                            <div className={s.ContainerInfoValue}>
                                <div className={s.ContainerInfoPrefix}>city:</div>{purchase.city.name}
                            </div>
                            <div className={s.ContainerInfoValue}>
                                <div className={s.ContainerInfoPrefix}>area:</div>{purchase.area.name}
                            </div>
                            <div className={s.ContainerInfoValue}>
                                <div className={s.ContainerInfoPrefix}>userid:</div>{purchase.userid}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Purhcase;
