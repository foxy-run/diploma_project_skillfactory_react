import React from "react";
import s from '../Header.module.scss';
import headerLogo from '../../../assets/logo.svg';
import Navigation from "../../Navigation/unauthorized/Navigation";

export default function Header() {
    return (
        <header className={s.header}>
            <a href='/'>
                <img className={s.headerLogo} src={headerLogo} alt='company logo'/>
            </a>
            <Navigation/>
        </header>
    )
}