import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { ChartDataItem } from '../model'

export interface ChartProps {
  average: Array<ChartDataItem>
  data: Array<ChartDataItem>
}

export const Chart: React.FC<ChartProps> = ({ average, data }) => {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        title: {
          text: '',
        },
        xAxis: {
          type: 'datetime',
        },
        plotOptions: {
          series: {
            marker: {
              enabled: false,
            },
          },
        },
        series: [
          {
            name: 'full data',
            type: 'line',
            data,
          },
          {
            name: 'average data',
            type: 'line',
            data: average,
          },
        ],
      }}
    />
  )
}
