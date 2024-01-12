import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import { ColDef } from "ag-grid-community"
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useState } from 'react';
import { Forecast, getDefaultForecasts } from './Forecast';
import { TFixedArray } from './types';
import { MonthHeaderComponent, MonthHeaderComponentExtraProps } from './MonthHeaderComponent';
import { UpdateForecastInput } from './ForecastMutationsInput';

type ForecastColDef = ColDef<Forecast>;

function monthsList() {
  const format = new Intl
    .DateTimeFormat('en', { month: 'long' }).format;

  return [...Array(12).keys()]
    .map((index) => format(new Date(Date.UTC(2024, index + 1))));
}


function getForecastMonthlyColDef(): TFixedArray<ForecastColDef, 12> {

  const forecastColDef: ForecastColDef[] = []

  const months = monthsList();

  for (let i = 0; i < 12; i++) {
    forecastColDef.push({
      colId: `month-${i}`,
      valueGetter: (params) => {
        return params.data?.forecasts[i] ?? 0
      },
      editable: true,
      valueSetter: (params) => {
        params.data.forecasts[i] = params.newValue;

        const input: UpdateForecastInput = {
          artistName: params.data.artistName,
          costume: params.data.costume,
          monthIndex: i,
          newForecast: params.newValue
        }
        console.log(JSON.stringify(input))

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
  // Row Data: The data to be displayed.
  const [rowData] = useState<Forecast[]>([
    {
      artistName: "Dupont",
      costume: "Three piece suit",
      forecasts: getDefaultForecasts()
    },
    {
      artistName: "Rick",
      costume: "White lab coat",
      forecasts: getDefaultForecasts()
    },
    {
      artistName: "Cuphead",
      costume: "Cup",
      forecasts: getDefaultForecasts()
    }
  ]);

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
        <AgGridReact rowData={rowData} defaultColDef={defaultColDef} columnDefs={colDef} />
      </div>
    </>
  )
}

export default App
