import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import { ColDef } from "ag-grid-community"
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useState } from 'react';
import { TFixedArray } from './types';
import { MonthHeaderComponent, MonthHeaderComponentExtraProps } from './MonthHeaderComponent';
import { v4 } from 'uuid'
import { ApiForecast, ApiForecastRow } from './ApiModel';
import { useApiForecast } from './Forecast';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

type ForecastColDef = ColDef<ApiForecast>;

function monthsList() {
  const format = new Intl
    .DateTimeFormat('en', { month: 'long' }).format;

  return [...Array(12).keys()]
    .map((index) => format(new Date(Date.UTC(2024, index + 1))));
}


function getForecastMonthlyColDef(): TFixedArray<ForecastColDef, 12> {

  const forecastColDef: ForecastColDef[] = []
  const months = monthsList();

  const { mutate } = useMutation({
    mutationFn: (forecastRow: ApiForecastRow) => {
      return axios.post('https://localhost:7120/Forecast/ForecastRow', forecastRow)
    },
  })


  for (let i = 0; i < 12; i++) {
    forecastColDef.push({
      colId: `month-${i}`,
      valueGetter: (params) => {
        return params.data?.forecastsRow[i]?.forecastValue ?? 0;
      },
      editable: true,
      valueSetter: (params) => {
        params.data.forecastsRow[i].forecastValue = params.newValue;
        mutate(params.data.forecastsRow[i]);

        return true;
      },
      headerComponent: MonthHeaderComponent,
      headerComponentParams: {
        month: months[i],
        monthId: i
      } satisfies MonthHeaderComponentExtraProps
    });
  }

  return forecastColDef as TFixedArray<ForecastColDef, 12>
}

function App() {


  const { data } = useApiForecast();

  const [defaultColDef] = useState<ColDef>({
    flex: 1
  })

  const [colDef] = useState<ForecastColDef[]>([
    {
      colId: "artistName",
      field: "artistName"
    },
    {
      colId: "costume",
      field: "costume"
    },
    ...getForecastMonthlyColDef()
  ]
  )

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        {/* The AG Grid component */}
        <AgGridReact rowData={data ?? []} defaultColDef={defaultColDef} columnDefs={colDef} />
      </div>
    </>
  )
}

export default App
