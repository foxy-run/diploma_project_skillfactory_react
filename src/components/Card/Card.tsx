import {ImgSource} from "../../types";
import s from './Card.module.scss';
import React from "react";

export default function Card({src, text}: ImgSource) {
    return (
        <div className={s.root}>
            <img className={s.card} src={src} alt=''/>
            <p>{text}</p>
        </div>
    )
}