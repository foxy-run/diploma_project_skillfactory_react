import React from 'react';
import s from '../Navigation.module.scss';
import {Link} from "react-router-dom";
import menuCake from "../../../assets/options-cake.svg";

export default function Navigation() {

    return (
        <div className={s.rootUnauth}>
            <nav className={s.navigation}>
                <ul className={s['navigation-list']}>
                    <li className={s['navigation-list__item']}>
                        <Link to={'/dashboard'}>
                            Главная
                        </Link>
                    </li>
                    <li className={s['navigation-list__item']}>Тарифы</li>
                    <li className={s['navigation-list__item']}>FAQ</li>
                </ul>
            </nav>
            <div className={s.menuWrapper}>
                <div className={s.loginMenu}>
                    <span className={s.register}>Зарегистрироваться</span>
                    <span className={s.separator}>|</span>
                    <button className={s.loginButton}>
                        <Link to={'/login'}>
                            Войти
                        </Link>
                    </button>
                </div>
                <img className={s.menuCake} src={menuCake} alt=''/>
            </div>
        </div>
    )
}