export interface ApiForecastRow {
    id: string;
    forecastId: string;
    month: number;
    forecastValue: number;
}

export interface ApiForecast {
    id: string;
    artistName: string;
    costume: string;
    forecastsRow: ApiForecastRow[]
}


export interface OrderForecastInput {
    monthIndex: number; // 0 based month index;
    payload: ApiForecast[]
}
