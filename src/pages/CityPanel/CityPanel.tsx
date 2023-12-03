import React, {FC, useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import ContentService from '../../services/ContentService';
import { ICity } from '../../models/ICity';
import CityList from '../../components/CityList/CityList';
import s from './CityPanel.module.sass'

const CityPanel: FC = () => {
    const {store} = useContext(Context);

    const [cities, setCities] = useState<ICity[]>([])

    const loadCities = async () => {
        const response = await ContentService.getCities()
        setCities(response.data.data)
    }

    useEffect(() => {
        loadCities()
    }, [])

    return (
        <div className={s.CityPanelWrapper}>
            <CityList cities={cities}/>
        </div>
    );
};

export default observer(CityPanel);
