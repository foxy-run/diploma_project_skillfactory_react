export type ImgSource = {
    src: string;
    text: string;
}

export type TTariffOptions = {
    firstOption: string,
    secondOption: string,
    thirdOption: string
}

export type TTariffCard = {
    tariffTitle: string,
    tariffDescription: string,
    actualPrice: string,
    oldPrice: string,
    monthlyRate: string,
    tariffOptions: TTariffOptions
    backgroundColor: string,
    color?: string,
    border?: string,
    src: string
}

export type TStatResults = {
    range: string,
    total: number,
    risks: number
}

export interface IAuthCredentials {
    login: string,
    password: string
}

export type TToken = {
    accessToken: string,
    expire: string
}

export type EventFilter = {
    "usedCompanyCount": number,
    "companyLimit": number
}

export type TEventFiltersInfo = {
    eventFiltersInfo: EventFilter
}

export type TIssueDateInterval = {
    startDate: string,
    endDate: string
}

type TSearchEntities = {
    type: string,
    inn: number,
    maxFullness: boolean,
    inBusinessNews: boolean
}

type TTargetSearchEntities = {
    targetSearchEntities: TSearchEntities[]
}

type TTargetSearchEntitiesContext = {
    targetSearchEntitiesContext: TTargetSearchEntities,
    onlyMainRole: boolean,
    tonality: "any",
    onlyWithRiskFactors: boolean
}

export type TAttributeFilters = {
    excludeTechNews: boolean,
    excludeAnnouncements: boolean,
    excludeDigests: boolean
}

export type TSearchData = {
    intervalType: string,
    issueDateInterval: TIssueDateInterval,
    searchContext: TTargetSearchEntitiesContext,
    histogramTypes: [totalDocuments: string, riskFactors: string],
    similarMode: "none" | "duplicates",
    limit: number,
    sortType: "issueDate" | "sourceInfluence",
    sortDirectionType: "asc" | "desc",
    attributeFilters: TAttributeFilters,
}

export type TTotalDocsResult = {
    date: string,
    value: number
}

export type TTotalDocsResultArray = {
    data: TTotalDocsResult[]
    histogramType: string
};

export type TTotalDocuments = {
    data: TTotalDocsResult,
    histogramType: string
}

// type TRiskFactors = {
//     data: TTotalDocsResultArray,
//     histogramType: string
// }

export type TSearchResults = TTotalDocsResultArray[]

//types for object search

export type TEncodedIdObject = {
    encodedId: string,
    influence: number,
    similarCount: number
}

type TMappingsObject = {
    inn: string,
    entityIds: number[]
}

export type TObjectItems = {
    items: TEncodedIdObject[],
    mappings: TMappingsObject[]
}

export type TEncodedIds = {
    ids: string[]
}

//types for articles search by ids

type TAttributes = {
    isAnnouncement: boolean,
    isDigest: boolean,
    isTechNews: boolean,
    wordCount: number
}

type TContent = {
    markup: string
}

type TSource = {
    name: string
}

type TTitle = {
    text: string
}

export type TOk = {
    attributes: TAttributes,
    issueDate: string,
    source: TSource,
    title: TTitle,
    content: TContent,
    url: string
}

export type TArticle = {
    ok: TOk
}