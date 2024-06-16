import React from "react";
import footerLogo from '../../assets/footer-logo.svg';
import s from './Footer.module.scss';

export default function Footer() {
    return (
        <footer className={s.footer}>
            <img className={s.footerLogo} src={footerLogo} alt='company logo'/>
            <div className={s.contactsDataContainer}>
                <div className={s.contactsData}>
                    <span>г. Москва, Цветной б-р, 40</span>
                    <span>+7 495 771 21 11</span>
                    <span>info@skan.ru</span>
                </div>
                <span className={s.copyright}>Copyright. 2022</span>
            </div>
        </footer>
    )
}