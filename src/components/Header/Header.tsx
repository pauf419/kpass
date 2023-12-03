import { Link } from "react-router-dom";

import {observer} from "mobx-react-lite";
import s from "./Header.module.sass"

const Header = () => {

    return (
        <div className={s.HeaderWrapper}>
            <div className={s.HeaderTitle}>
                KrakenPass
            </div>
            <div className={s.HeaderAction}>
                <a className={s.HeaderLink} href="/city">
                    city_pan
                </a>
                <a className={s.HeaderLink} href="/product">
                    product_pan
                </a>
                <a className={s.HeaderLink} href="/order">
                    orders_pan
                </a>
            </div>
        </div>
    );
};

export default observer(Header);
