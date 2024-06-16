import React, {ChangeEvent, useEffect, useState} from "react";
import s from './SearchForm.module.scss';
import st from '../Main/Main.module.scss';
import document from '../../assets/Document.svg';
import folders from '../../assets/Folders.svg';
import manLookingOut from '../../assets/man-looking-out.svg';
import {Link, redirect, useNavigate} from "react-router-dom";
import {TArticle, TEncodedIdObject, TEncodedIds, TSearchData, TSearchResults} from "../../types";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {RootState} from "../../redux/store";
import localStorage from "redux-persist/es/storage";
import {getStats} from "../../redux/slices/statsSlice";
import {getItems} from "../../redux/slices/idsSlice";
import {getArticles} from "../../redux/slices/articlesSlice";
import {count} from "../../redux/slices/eventFiltersSlice";
import {checkboxData} from "../../data";
import Checkbox from "../Checkbox/Checkbox";
import {checkOptions, checkStatus} from "../../redux/slices/checkboxSlice";
import api from "../../api/http";

export default function SearchForm() {

    const [formIsValid, setFormIsValid] = useState(false);

    const [innValue, setInnValue] = useState('');
    const [innIsValid, setInnIsValid] = useState(false);
    const [innIsEmpty, setInnIsEmpty] = useState(true);

    const [docsAmount, setDocsAmount] = useState('');
    const [amountIsValid, setAmountIsValid] = useState(false);
    const [amountIsEmpty, setAmountIsEmpty] = useState(true);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [startDateIsValid, setStartDateIsValid] = useState(true);
    const [endDateIsValid, setEndDateIsValid] = useState(true);

    const [isError, setIsError] = useState(false);

    const checkboxOptions = useAppSelector((state: RootState) => state.checkboxOptions);
    const checkboxStatus = useAppSelector((state: RootState) => state.checkboxStatus);
    const tariffInfo = useAppSelector((state: RootState) => state.tariffLimits.eventFiltersInfo);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const SEARCH_DATA: TSearchData = {
        intervalType: 'month',
        attributeFilters: {
            excludeTechNews: checkboxOptions[4].status,
            excludeDigests: checkboxOptions[6].status,
            excludeAnnouncements: checkboxOptions[5].status
        },
        histogramTypes: [
            'totalDocuments',
            'riskFactors'
        ],
        limit: Number(docsAmount),
        similarMode: 'none',
        searchContext: {
            targetSearchEntitiesContext: {
                targetSearchEntities: [
                    {
                        inn: Number(innValue),
                        type: 'company',
                        inBusinessNews: checkboxOptions[1].status,
                        maxFullness: checkboxOptions[0].status
                    }
                ]
            },
            onlyMainRole: checkboxOptions[2].status,
            tonality: "any",
            onlyWithRiskFactors: checkboxOptions[3].status,
        },
        sortDirectionType: "asc",
        sortType: "issueDate",
        issueDateInterval: {
            startDate: startDate,
            endDate: endDate
        }
    }

    async function searchDocs(searchData: TSearchData) {
        const token = await localStorage.getItem('token');
        try {
            await api.post('/api/v1/objectsearch/histograms',
                searchData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
                .then(response => {
                    dispatch(getStats(response.data.data.map((resultData: TSearchResults[]) => resultData)));
                });
        } catch (err: any) {
            if (err.status === 401) {
                redirect('/login');
            }
        }
    }

    async function searchObjects(searchData: TSearchData) {
        const token = await localStorage.getItem('token');
        try {
            const response = await api.post('/api/v1/objectsearch',
                searchData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const encodedIdsArr = response.data.items.map((ids: TEncodedIdObject) => ids.encodedId)
            dispatch(getItems(encodedIdsArr));
            return encodedIdsArr;
        } catch (err: any) {
            alert(err.message)
        }
    }

    async function getDocs(ids: TEncodedIds) {
        const token = await localStorage.getItem('token');
        try {
            const response = await api.post('/api/v1/documents',
                ids,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            return response.data;
        } catch (err: any) {
            alert(err.message)
        }
    }

    useEffect(() => {
        if (tariffInfo.usedCompanyCount === tariffInfo.companyLimit) return;
        innIsValid && amountIsValid && startDateIsValid && endDateIsValid && setIsDisabled(false);
        validateDate();

        if (isError) {
            validateData();
        }
    }, [
        isError,
        innValue,
        docsAmount,
        startDate,
        endDate,
        tariffInfo.usedCompanyCount,
        tariffInfo.companyLimit,
        innIsValid,
        amountIsValid,
        startDateIsValid,
        endDateIsValid
    ]);

    function handleInnFocusOut() {
        validateInn(innValue);
        if (!isError) {
            setFormIsValid(true);
        }
    }

    function handleAmountFocusOut() {
        validateAmount();
        if (!isError) {
            setFormIsValid(true);
        }
    }

    async function sendData() {
        await searchDocs(SEARCH_DATA)
        const responseIds = await searchObjects(SEARCH_DATA) as string[];
        const responseArticles = await getDocs({ids: responseIds}) as TArticle[];
        dispatch(getArticles(responseArticles));
        dispatch(count());

        if (formIsValid) {
            navigate('/results');
        }
    }

    function handleCheck(e: React.MouseEvent) {
        const target = e.currentTarget as HTMLDivElement;
        checkboxStatus.map((checkbox, id) => {
            const statusIndex = checkboxStatus.findIndex(status => status.id === checkbox.id);
            if (Number(target.id) === statusIndex && !checkbox.active && !checkboxOptions[id].status) {
                dispatch(checkStatus({
                    active: true,
                    id: id
                }));

                dispatch(checkOptions({
                    status: true,
                    id: id,
                    option: checkboxData[id].english
                }))
            } else if (Number(target.id) === statusIndex && checkbox.active && checkboxOptions[id].status) {
                dispatch(checkStatus({
                    active: false,
                    id: id
                }));

                dispatch(checkOptions({
                    status: false,
                    id: id,
                    option: checkboxData[id].english
                }))
            } else if (Number(target.id) === statusIndex && !checkbox.active && checkboxOptions[id].status) {
                dispatch(checkOptions({
                    status: false,
                    id: id,
                    option: checkboxData[id].english
                }))

                dispatch(checkStatus({
                    active: true,
                    id: id
                }));
            } else if (Number(target.id) === statusIndex && checkbox.active && !checkboxOptions[id].status) {
                dispatch(checkOptions({
                    status: true,
                    id: id,
                    option: checkboxData[id].english
                }))

                dispatch(checkStatus({
                    active: false,
                    id: id
                }));
            }
        })
    }

    function handleInnValue(e: React.FormEvent) {
        const target = e.target as HTMLInputElement;
        setInnValue(target.value);
    }

    async function validateData() {
        await validateInn(innValue);
        await validateAmount();
    }

    async function validateInn(inn: string) {
        const innString = inn.toString();

        if (innString === '') {
            setInnIsEmpty(true);
            setIsError(true);
        } else if (/[^0-9]/.test(innString)) {
            setInnIsValid(false);
            setInnIsEmpty(false);
            setIsError(true);

        } else if ([10].indexOf(innString.length) === -1) {
            setInnIsValid(false);
            setIsError(true);
            setInnIsEmpty(false);
        } else {
            let checkDigit = function (inn: string, coefficients: number[]) {
                let n = 0;
                for (let i = 0; i < coefficients.length; i++) {
                    n += coefficients[i] * Number(inn[i]);
                }
                return parseInt(String(n % 11 % 10));
            };
            if (innString.length === 10) {
                let n10 = checkDigit(innString, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
                if (n10 === parseInt(innString[9])) {
                    setInnIsValid(true);
                    setInnIsEmpty(false);
                    setIsError(false);
                } else {
                    setInnIsValid(false);
                    setIsError(true);
                    setInnIsEmpty(false);
                }
            }
        }
    }

    async function validateAmount() {
        if ((Number(docsAmount) < 1 || Number(docsAmount) > 1000) && docsAmount !== '') {
            setAmountIsValid(false);
            setAmountIsEmpty(false);
            setIsError(true);
        } else if (docsAmount === "") {
            setAmountIsValid(false);
            setAmountIsEmpty(true);
            setIsError(true);
        } else {
            setAmountIsValid(true);
        }
    }

    async function validateDate() {
        const date = new Date(endDate);
        const UTCHours = date.setUTCHours(-1);
        const adjustedDate = new Date(UTCHours);

        if (startDate > endDate && endDate) {
            setStartDateIsValid(false);
        } else {
            setStartDateIsValid(true);
        }

        if (adjustedDate > new Date()) {
            setEndDateIsValid(false)
        } else {
            setEndDateIsValid(true);
        }
    }

    function handleDocsAmount(e: React.FormEvent) {
        const target = e.target as HTMLInputElement;
        setDocsAmount(target.value);
    }

    function getStartDate(e: ChangeEvent) {
        const target = e.target as HTMLInputElement;
        setStartDate(target.value);
    }

    function getEndDate(e: ChangeEvent) {
        const target = e.target as HTMLInputElement;
        setEndDate(target.value);
    }

    function focus(e: React.FocusEvent) {
        const target = e.target as HTMLInputElement;

        return target.type = 'date';
    }

    return (
        <div className={s.root}>
            <div>
                <div className={s['paragraph-container']}>
                    <div>
                        <p className={s.paragraph}>Найдите необходимые <br/> данные в пару кликов.</p>
                        <p className={s.text}>Задайте параметры поиска. <br/> Чем больше заполните, тем точнее поиск</p>
                    </div>
                </div>
                <div className={s.container}>
                    <div>
                        <form className={s['form-container']}>
                            <div className={s['input-container']}>
                                <label htmlFor='inn'>ИНН компании*</label>
                                <input
                                    className={isError && !innIsValid ? s.inputError : s.input}
                                    type='number'
                                    placeholder='10 цифр'
                                    maxLength={10} id='inn'
                                    value={innValue}
                                    onInput={handleInnValue}
                                    onBlur={handleInnFocusOut}
                                />
                                {!innIsValid && !innIsEmpty && isError &&
                                  <span className={s.innError}>Введите корректные данные</span>}
                                {innIsEmpty && isError && !innIsValid &&
                                  <span className={s.innError}>Обязательное поле</span>}
                            </div>
                            <div className={s['input-container']}>
                                <label htmlFor='selectTon'>Тональность</label>
                                <select style={{appearance: 'none', paddingLeft: '15px'}} className={s.input}
                                        id='selectTon'>
                                    <option>Любая</option>
                                </select>
                                <div className={s['dropdown-arrow']}></div>
                            </div>
                            <div className={s['input-container']}>
                                <label htmlFor='amount'>Количество документов в выдаче*</label>
                                <input
                                    className={isError && !amountIsValid ? s.inputError : s.input}
                                    type="number" max={1000}
                                    id='amount'
                                    placeholder='От 1 до 1000'
                                    value={docsAmount}
                                    onInput={handleDocsAmount}
                                    onBlur={handleAmountFocusOut}
                                />
                                {!amountIsEmpty && isError && !amountIsValid &&
                                  <span className={s.innError}>Введите корректные данные</span>}
                                {amountIsEmpty && isError && !amountIsValid &&
                                  <span className={s.innError}>Обязательное поле</span>}
                            </div>
                            <div style={{marginTop: '14px'}} className={s['input-container']}>
                                <label htmlFor='range'>Диапозон поиска*</label>
                                <div className={s['date-range-container']}>
                                    <input type='text' className={s['date-input']} placeholder='Дата начала'
                                           onFocus={focus} onChange={getStartDate}/>
                                    <div className={s.startDateDropdown}></div>
                                    <input type='text' className={s['date-input']} placeholder='Дата конца'
                                           onFocus={focus} onChange={getEndDate}/>
                                    <div className={s.endDateDropdown}></div>
                                    {
                                        !startDateIsValid && <span className={s.innError}>
                                      Дата начала не может быть позже даты конца
                                    </span>
                                    }
                                    {
                                        !endDateIsValid && <span className={s.innError}>
                                      Даты не могут быть в будущем времени
                                    </span>
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className={s['checkbox-button-container']}>
                        <div className={s['checkbox-options-container']}>
                            {checkboxData.map((item, id) => {
                                return (
                                    <>
                                        <Checkbox children={item.russian} id={id} onClick={handleCheck}
                                                  isChecked={checkboxStatus[id].active}/>
                                    </>
                                )
                            })}
                        </div>
                        <div className={s['button-container']}>
                            <button className={isDisabled ? st.searchButton : st.searchButtonActive}
                                    onClick={sendData} disabled={isDisabled}>
                                Поиск
                            </button>
                            {/*</Link>*/}
                            {tariffInfo.usedCompanyCount === tariffInfo.companyLimit &&
                              <span className={s.submitError}>Вы достигли дневного лимита. Возвращайтесь завтра.</span>}
                            <p style={{fontSize: '14px', color: 'rgba(148, 148, 148, 1)'}}>* Обязательные к заполнению поля</p>
                        </div>
                    </div>
                    <div className={s['button-container-mobile']}>
                        <Link to={'/results'}>
                            <button type={"submit"} className={isDisabled ? st.searchButton : st.searchButtonActive}
                                    onClick={sendData}>
                                Поиск
                            </button>
                        </Link>
                        {tariffInfo.usedCompanyCount === tariffInfo.companyLimit &&
                          <span className={s.submitError}>Вы достигли дневного лимита. Возвращайтесь завтра..</span>}
                        <p style={{fontSize: '14px', color: 'rgba(148, 148, 148, 1)'}}>* Обязательные к заполнению поля</p>
                    </div>
                </div>
            </div>
            <div className={s['image-container']}>
                <div className={s['image-container__images-on-the-top']}>
                    <img className={s.document} src={document} alt='document'/>
                    <img className={s.folders} src={folders} alt='folders'/>
                </div>
                <div style={{marginLeft: '60px'}}>
                    <img className={s.manLookingOut} src={manLookingOut} alt='manLookingOut'/>
                </div>
            </div>
        </div>
    )
}