

import React, {FC, useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import { ICity } from '../../models/ICity';
import s from "./City.module.sass"
import Area from '../Area/Area';
import { IArea } from '../../models/IArea';
import ContentService from '../../services/ContentService';

interface Props {
    city: ICity
    removeCity: (id:string) => void
    imit?: boolean
    addCity?: (name:string) => void
}

const City: FC<Props> = ({city, removeCity, imit, addCity}) => {
    const {store} = useContext(Context);

    const [dropdownActive, setDropdownActive] = useState<boolean>(false)
    const [areaDialogActive, setAreaDialogActive] = useState<boolean>(false)
    const [areas, setAreas] = useState<IArea[]>(city.areas)
    const [cityName, setCityName] = useState<string>("")

    useEffect(() => {
        if(areaDialogActive) setDropdownActive(true)
    }, [areaDialogActive])

    const removeArea = (id:string): void => {
        setAreas(areas.filter(a => a.id !== id))
    }

    const pushArea = async (name:string): Promise<void> => {
        const response = await ContentService.addArea(name, city.id);
        const area:IArea = response.data.data
        setAreas(prevAreas=> {
            return [...prevAreas, area]
        })
        setAreaDialogActive(false)
    }

    if(imit) return (
        <div className={s.ContainerContainer}>
            <div className={s.ContainerWrapper}>
                <div className={s.WrapperSegment}>
                    <div className={s.ContainerHeader}>
                        #{cityName}
                    </div>
                    <div className={s.ContainerBody}>
                        <div className={s.ContainerInfo}>
                            <div className={s.ContainerInfoValue}>
                                <input placeholder="Enter new city name" className={s.ImitInput} onChange={e => setCityName(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.ControllsWrapper}>
                    <button className={s.ControllsBtn} onClick={() => addCity!(cityName)}>
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
                        #{city.hash_name}
                    </div>
                    <div className={s.ContainerBody}>
                        <div className={s.ContainerInfo}>
                            <div className={s.ContainerInfoValue}>
                                {city.name}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.ContainerDropdown}>
                    <button className={s.DropdownInit} onClick={() => setAreaDialogActive(!areaDialogActive)}>
                        {
                            areaDialogActive
                                ? 
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"/>
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                                </svg>
                        }
                    </button>
                     
                    <button className={s.DropdownInit} onClick={() => removeCity(city.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </button>

                    {
                        areas.length ?
                        <button className={s.DropdownInit} onClick={() => setDropdownActive(!dropdownActive)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={dropdownActive ? s.SvgActive : s.SvgInactive} viewBox="0 0 16 16">
                                <path fillOpacity=".4" d="M12.995 8.195c0 .937-.312 1.912-.78 2.693l1.99 1.99c.976-1.327 1.6-2.966 1.6-4.683 0-1.795-.624-3.434-1.561-4.76l-2.068 2.028c.468.781.78 1.679.78 2.732h.04Z"/>
                                <path d="M8 13.151a4.995 4.995 0 1 1 0-9.99c1.015 0 1.951.273 2.732.82l1.95-2.03a7.805 7.805 0 1 0 .04 12.449l-1.951-2.03a5.072 5.072 0 0 1-2.732.781z"/>
                            </svg>
                        </button>
                        :""
                    }
                </div>
            </div>
            <div className={`${s.AreaMapper} ${dropdownActive && s.MapperActive}`}>
                {
                    areaDialogActive && <Area area={{} as IArea} removeArea={removeArea} imit={true} pushArea={pushArea}/>
                }
                {
                    areas.map(el => <Area key={el.id} area={el} removeArea={removeArea}/>)
                }
            </div>
        </div>
    );
};

export default observer(City);
