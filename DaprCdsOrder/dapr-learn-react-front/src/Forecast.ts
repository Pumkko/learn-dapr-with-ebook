import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { ApiForecast, ApiForecastRow } from "./ApiModel";
import { v4 } from 'uuid'


export function useApiForecast() {
    return useQuery({
        queryKey: ["forecasts"],
        queryFn: async () => {
            const { data } = await axios.get<ApiForecast[]>("https://localhost:7120/Forecast");
            for (const forecast of data) {
                for (let i = 0; i < 12; i++) {
                    if (forecast.forecastsRow[i] === undefined) {
                        forecast.forecastsRow[i] = {
                            month: i,
                            forecastValue: 0,
                            id: v4(),
                            forecastId: forecast.id
                        } satisfies ApiForecastRow
                    }
                }
            }

            return data;
        }
    })
}