import s from '../../components/Main/Main.module.scss';
import st from './Tariff.module.scss';
import checkmark from '../../assets/checkmark.svg';
import {TTariffCard} from "../../types";
import React from 'react';
import {useAppSelector} from "../../hooks/hooks";
import {RootState} from "../../redux/store";

export default function TariffCard(
    {
        tariffTitle,
        tariffDescription,
        actualPrice,
        oldPrice,
        monthlyRate,
        tariffOptions,
        backgroundColor,
        color,
        border,
        src
    }: TTariffCard
) {

    const authorized = useAppSelector((state: RootState) => state.authorization);

    return (
        <div style={{border: `${border}`}} className={st.root}>
            <div style={
                {
                    backgroundColor: `${backgroundColor}`,
                    color: `${color}`,
                }
            } className={st['tariff-title']}>
                <div>
                    <h2 className={st['tariff-title__title']}>{tariffTitle}</h2>
                    <span className={st['tariff-title__description']}>{tariffDescription}</span>
                </div>
                <img className={st['tariff-title__image']} src={src} alt='lamp'/>
            </div>
            <div className={st['tariff-details-container']}>
                {authorized.accessToken && border && <div className={st['current-tariff-icon']}>Текущий тариф</div>}
                <div className={st['price-container']}>
                    <span className={st['price-container__actual-price']}>{actualPrice}</span>
                    <span className={st['price-container__old-price']}>{oldPrice}</span>
                </div>
                <div className={st.monthlyRate}>
                    <p>{monthlyRate}</p>
                </div>
            </div>
            <div className={st['tariff-options']}>
                <h6 className={st.tariffIncludes}>В тариф входит:</h6>
                <div className={st['tariff-options__option']}>
                    <img src={checkmark} alt='checkmark'/>
                    <span className={st['eighteen-px-text']}>{tariffOptions.firstOption}</span>
                </div>
                <div className={st['tariff-options__option']}>
                    <img src={checkmark} alt='checkmark'/>
                    <span className={st['eighteen-px-text']}>{tariffOptions.secondOption}</span>
                </div>
                <div className={st['tariff-options__option']}>
                    <img src={checkmark} alt='checkmark'/>
                    <span className={st['eighteen-px-text']}>{tariffOptions.thirdOption}</span>
                </div>
            </div>
            <button className={authorized && border ? s.activatedTariff : s.seeDetailsButton}>
                {authorized.accessToken && border ? 'Перейти в личный кабинет' : 'Подробнее'}
            </button>
        </div>)
}