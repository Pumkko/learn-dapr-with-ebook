import { IHeaderParams } from 'ag-grid-community'
import { Forecast } from './Forecast';
import { OrderForecastInput } from './ForecastMutationsInput';


export interface MonthHeaderComponentExtraProps {
    month: string;
    monthId: number;
}

export function MonthHeaderComponent(params: IHeaderParams<Forecast> & MonthHeaderComponentExtraProps) {

    const onClick = () => {
        const orderInput: OrderForecastInput = {
            monthIndex: params.monthId,
            payload: []
        }
        params.api.forEachNodeAfterFilter(n => {
            if (!n.data) {
                return;
            }
            orderInput.payload.push({
                artistName: n.data.artistName,
                costume: n.data.costume,
                forecast: n.data.forecasts[params.monthId]
            });
        });

        console.log(JSON.stringify(orderInput));

    }

    return <div className='flex justify-between w-full'>
        <span>{params.month}</span>
        <svg role='button' onClick={onClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
        </svg>
    </div>
}