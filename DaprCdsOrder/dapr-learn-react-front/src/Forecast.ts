import { TFixedArray } from "./types";

// Hardcoded because it helps typescript check boundaries
type TForecast = TFixedArray<number, 12>

export interface Forecast {
    artistName: string;
    costume: string;
    forecasts: TForecast;
}

export const getDefaultForecasts: () => TForecast = () => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] 