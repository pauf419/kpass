

import React, {FC, useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import { ICity } from '../../models/ICity';
import City from '../City/City';
import s from "./CityList.module.sass"
import ContentService from '../../services/ContentService';

interface Props {
    cities: ICity[]
}

const CityList: FC<Props> = ({cities}) => {
    const {store} = useContext(Context);

    const [cityState, setCityState] = useState<ICity[]>([])
    const [addCityDialogActive, setAddCityDialogActive] = useState<boolean>(false)

    useEffect(() => {
        setCityState(cities)
    }, [cities])

    const removeCity = async (id:string): Promise<void> => {
        ContentService.removeCity(id)
        setCityState(prevState => {
            return prevState.filter(e => e.id !== id)
        })
    }

    const addCity = async (name:string): Promise<void> => {
        const response = await ContentService.addCity(name)
        const city:ICity = response.data.data
        setCityState(prevState => {
            prevState.push(city)
            return [...prevState]
        })
        setAddCityDialogActive(false)
    }

    return (
        <div className={s.CityListWrapper}>
            {
                cityState.map(el => <City key={el.id} city={el} removeCity={removeCity}/>)
            }
            <div className={`${s.CityAddWrapper} ${addCityDialogActive ? s.CityAddWrapperActive : ""}`}>
                {
                    addCityDialogActive
                        ? 
                            <City city={{} as ICity}  removeCity={removeCity} imit={true} addCity={addCity}/>
                        :
                        <button className={s.AddCityBtn} onClick={() => setAddCityDialogActive(true)}>
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
