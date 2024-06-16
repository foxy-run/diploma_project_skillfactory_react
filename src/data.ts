import stopWatch from "./assets/stop-watch.svg";
import magnifyingGlass from "./assets/magnifying-glass.svg";
import shield from "./assets/shield.svg";
import lamp from './assets/lamp.svg';
import goal from './assets/dart.svg';
import laptop from './assets/laptop.svg';

export const cardContents = [
    {
        src: stopWatch,
        text: 'Высокая и оперативная скорость \n обработки заявки'
    },
    {
        src: stopWatch,
        text: 'Быстрый поиск публикаций'
    },
    {
        src: magnifyingGlass,
        text: 'Огромная комплексная база \n данных, обеспечивающая объективный ответ на запрос'
    },
    {
        src: magnifyingGlass,
        text: 'Поиск компаний на территории РФ'
    },
    {
        src: shield,
        text: 'Защита конфиденциальных сведений,\n не подлежащих разглашению по федеральному законодательству'
    },
    {
        src: shield,
        text: 'Защита ваших денег'
    }
]

export const tariffCardContents = [
    {
        tariffTitle: 'Beginner',
        tariffDescription: 'Для небольшого исследования',
        actualPrice: '799 ₽',
        oldPrice: '1200 ₽',
        monthlyRate: 'или 150 ₽/мес. при рассрочке на 24 мес.',
        tariffOptions: {
            firstOption: 'Безлимитная история запросов',
            secondOption: 'Безопасная сделка',
            thirdOption: 'Поддержка 24/7'
        },
        backgroundColor: 'rgba(255, 182, 79, 1)',
        color: '',
        border: '2px solid rgba(255, 182, 79, 1)',
        src: lamp
    },
    {
        tariffTitle: 'Pro',
        tariffDescription: 'Для HR и фрилансеров',
        actualPrice: '1299 ₽',
        oldPrice: '2600 ₽',
        monthlyRate: 'или 279 ₽/мес. при рассрочке на 24 мес.',
        tariffOptions: {
            firstOption: 'Все пункты тарифа Beginner',
            secondOption: 'Экспорт истории',
            thirdOption: 'Рекомендации по приоритетам'
        },
        backgroundColor: 'rgba(124, 227, 225, 1)',
        color: '',
        src: goal
    },
    {
        tariffTitle: 'Business',
        tariffDescription: 'Для корпоративных клиентов',
        actualPrice: '2379 ₽',
        oldPrice: '3700 ₽',
        monthlyRate: '',
        tariffOptions: {
            firstOption: 'Все пункты тарифа Pro',
            secondOption: 'Безлимитное количество запросов',
            thirdOption: 'Приоритетная поддержка'
        },
        backgroundColor: 'rgba(0, 0, 0, 1)',
        color: 'white',
        src: laptop
    }
]

export const checkboxData = [
    {
        russian: 'Признак максимальной полноты',
        english: 'maxFullnes',
        status: false,
        id: 0
    },
    {
        russian: 'Упоминания в бизнес-контексте',
        english: 'inBusinessNews',
        status: false,
        id: 1
    },
    {
        russian: 'Главная роль в публикации',
        english: 'onlyMainRole',
        status: false,
        id: 2
    },
    {
        russian: 'Публикации только с риск-факторами',
        english: 'onlyWithRiskFactors',
        status: false,
        id: 3
    },
    {
        russian: 'Включать технические новости рынков',
        english: 'excludeTechNews',
        status: true,
        id: 4
    },
    {
        russian: 'Включать анонсы и календари',
        english: 'excludeAnnouncements',
        status: true,
        id: 5
    },
    {
        russian: 'Включать сводки новостей',
        english: 'excludeDigests',
        status: true,
        id: 6
    }
]

export const statData = [
    {
        range: '10.09.2021',
        total: 5,
        risks: 2
    },
    {
        range: '11.09.2021',
        total: 6,
        risks: 0
    },
    {
        range: '12.09.2021',
        total: 4,
        risks: 2
    },
    {
        range: '13.09.2021',
        total: 10,
        risks: 7
    },
    {
        range: '10.09.2021',
        total: 5,
        risks: 2
    },
    {
        range: '11.09.2021',
        total: 6,
        risks: 0
    },
    {
        range: '12.09.2021',
        total: 4,
        risks: 2
    },
    {
        range: '13.09.2021',
        total: 10,
        risks: 7
    },
    {
        range: '13.09.2021',
        total: 10,
        risks: 7
    },
    {
        range: '12.09.2021',
        total: 4,
        risks: 2
    },
    {
        range: '13.09.2021',
        total: 10,
        risks: 7
    },
    {
        range: '13.09.2021',
        total: 10,
        risks: 7
    }
]