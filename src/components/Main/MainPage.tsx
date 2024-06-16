import bgImage1 from '../../assets/Image 1.png';
import leftArrow from '../../assets/left-arrow.svg';
import rightArrow from '../../assets/arrow-right.svg';
import sittingMan from '../../assets/sitting-man.svg';
import s from './Main.module.scss';
import Card from "../Card/Card";
import {ImgSource, TTariffCard} from "../../types";
import TariffCard from "../TariffCard/TariffCard";
import {cardContents, checkboxData, tariffCardContents} from '../../data';
import React from 'react';
import {Link} from "react-router-dom";
import {RootState} from "../../redux/store";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {initializeOptions, initializeStatus} from "../../redux/slices/checkboxSlice";

// @ts-ignore
export function LeftArrow({onClick, ...rest}) {
    return (
        <img onClick={() => onClick()} className={s.leftArrow} src={leftArrow} alt='right'/>
    )
}

// @ts-ignore
export function RightArrow({onClick, ...rest}) {
    return (
        <img onClick={() => onClick()} className={s.rightArrow} src={rightArrow} alt='right'/>
    )
}

export default function MainPage() {

    const authorized = useAppSelector((state: RootState) => state.authorization);
    const checkboxOptions = useAppSelector((state: RootState) => state.checkboxOptions)
    const checkboxStatus = useAppSelector((state: RootState) => state.checkboxStatus)
    const dispatch = useAppDispatch();

    function addDefaultStatus() {
        checkboxData.map(status => {
            checkboxStatus.length === 0 && dispatch(initializeStatus({
                active: false,
                id: status.id
            }));

            checkboxOptions.length === 0 && dispatch(initializeOptions({
                id: status.id,
                option: status.english,
                status: status.status
            }))
        });
    }

    return (
        <div className={s.root}>
            <div className={s.publicationSearchContainer}>
                <div>
                    <div>
                        <p className={s.paragraph}>Сервис по поиску <br/> публикаций <br/> о компании <br/> по его ИНН
                        </p>
                        <p style={{fontSize: '20px'}}>Комплексный анализ публикаций, получение данных <br/> в формате PDF на электронную почту.</p>
                    </div>
                    {authorized.accessToken &&
                      <button
                        className={s.getDataByInnButton}
                        onClick={() => {
                            addDefaultStatus();
                        }
                        }
                      >
                        <Link to={'/searchForm'}>
                          Запросить данные
                        </Link>
                      </button>
                    }
                </div>
                <img src={bgImage1} alt='man pointing at the screen'/>
            </div>
            <div className={s.sliderContainerWrapper}>
                <p className={s.ourTariffs}>Почему именно мы</p>
                <div className={s.sliderContainer}>
                    <Carousel
                        additionalTransfrom={0}
                        arrows={true}
                        customLeftArrow={<LeftArrow onClick={undefined}/>}
                        customRightArrow={<RightArrow onClick={undefined}/>}
                        autoPlaySpeed={5000}
                        autoPlay={false}
                        centerMode={false}
                        className={s.cardsContainer}
                        containerClass=''
                        dotListClass=""
                        draggable
                        focusOnSelect={false}
                        infinite={false}
                        itemClass=""
                        keyBoardControl
                        minimumTouchDrag={80}
                        pauseOnHover
                        renderArrowsWhenDisabled={false}
                        renderButtonGroupOutside={false}
                        renderDotsOutside={false}
                        responsive={{
                            desktop: {
                                breakpoint: {
                                    max: 3000,
                                    min: 1024
                                },
                                items: 3,
                                partialVisibilityGutter: 40
                            },
                            mobile: {
                                breakpoint: {
                                    max: 400,
                                    min: 0
                                },
                                items: 1,
                                partialVisibilityGutter: 30
                            },
                            tablet: {
                                breakpoint: {
                                    max: 1024,
                                    min: 464
                                },
                                items: 2,
                                partialVisibilityGutter: 30
                            }
                        }}
                        rewind={false}
                        rewindWithAnimation={false}
                        rtl={false}
                        shouldResetAutoplay
                        showDots={false}
                        sliderClass=""
                        slidesToSlide={1}
                        swipeable
                    >
                        {cardContents.map((cardContent: ImgSource) => {
                            return <Card src={cardContent.src} text={cardContent.text}/>
                        })}
                    </Carousel>
                </div>
            </div>
            <img className={s.sittingManImg} src={sittingMan} alt='sittingMan'/>
            <div>
                <p className={s.ourTariffs}>Наши тарифы</p>
                <div className={s.tariffCardsContainer}>
                    {
                        tariffCardContents.map((tariffCard: TTariffCard) => {
                            return <TariffCard
                                tariffTitle={tariffCard.tariffTitle}
                                tariffDescription={tariffCard.tariffDescription}
                                actualPrice={tariffCard.actualPrice}
                                oldPrice={tariffCard.oldPrice}
                                monthlyRate={tariffCard.monthlyRate}
                                tariffOptions={{
                                    firstOption: tariffCard.tariffOptions.firstOption,
                                    secondOption: tariffCard.tariffOptions.secondOption,
                                    thirdOption: tariffCard.tariffOptions.thirdOption
                                }}
                                backgroundColor={tariffCard.backgroundColor}
                                border={authorized.accessToken ? tariffCard.border : ''}
                                color={tariffCard.color}
                                src={tariffCard.src}
                            />
                        })
                    }
                </div>
            </div>
        </div>
    )
}