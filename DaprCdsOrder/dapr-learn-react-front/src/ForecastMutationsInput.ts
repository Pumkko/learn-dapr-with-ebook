export interface OrderForecastInput {
    monthIndex: number; // 0 based month index;
    payload: {
        artistName: string;
        costume: string;
        forecast: number
    }[]
}

export interface UpdateForecastInput {
    monthIndex: number; // 0 based month index;
    artistName: string;
    costume: string;
    newForecast: number
}