import React from "react";
import s from '../Header.module.scss';
import headerLogo from '../../../assets/logo.svg';
import NavigationAuthorized from "../../Navigation/authorized/NavigationAuthorized";

export default function HeaderAuthorized() {
    return (
        <header className={s.header}>
            <a href='/'>
                <img className={s.headerLogo} src={headerLogo} alt='company logo'/>
            </a>
            <NavigationAuthorized/>
        </header>
    )
}