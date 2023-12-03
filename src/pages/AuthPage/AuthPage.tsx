import React, {FC, useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import cl from "./AuthPage.module.sass"

const AuthPage: FC = () => {
    const [apiKey, setApiKey] = useState<string>('')
    const {store} = useContext(Context);

    return (
        <div className={cl.AuthPageWrapper}>
            <input
                className={cl.AuthPageInp}
                onChange={e => setApiKey(e.target.value)}
                value={apiKey}
                type="text"
                placeholder='Enter key'
            />
            <button className={cl.AuthPageButton} onClick={() => store.verifyAccess(apiKey)}>
                submit
            </button>
        </div>
    );
};

export default observer(AuthPage);
