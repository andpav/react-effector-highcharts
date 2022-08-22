import { combine } from 'effector'
import { createEvent, createEffect, restore, forward, sample } from 'effector'
import { debounce } from 'patronum'

import { getChartData, ChartDataResult } from '../api'
import { DateValidationScheme } from '../schemes'
import { prepareDate, calculateAverageData } from './date'

export const setRange = createEvent<string>()
export const $range = restore(setRange, '3d')
export const $rangeNumber = $range.map((range) =>
  Number(range.replace('d', ''))
)

export const getData = createEvent<{ start: number; end: number }>()
export const getDataFx = createEffect(getChartData)

export const changeFromOrTo = createEvent<DateValidationScheme>()

sample({
  source: changeFromOrTo,
  fn: ({ from, to }) => ({
    start: prepareDate(from),
    end: prepareDate(to)
  }),
  target: getData
})

debounce({
  source: getData,
  timeout: 500,
  target: getDataFx
})

const setChartData = createEvent<ChartDataResult>()

export const $chartData = restore(setChartData, [])

export const $averagedChartData = combine(
  $chartData,
  $rangeNumber,
  calculateAverageData
)

export const $chartShowing = combine(
  $chartData,
  $averagedChartData,
  (data, averagedData) => Boolean(data.length && averagedData.length)
)

forward({
  from: getDataFx.doneData,
  to: setChartData
})

forward({
  from: getDataFx.failData,
  to: createEffect(console.error)
})
