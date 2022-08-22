import { ChartDataItem, ChartDataResult } from '../api'

export const prepareDate = (date: Date) => date.getTime() / 1000

export const calculateAverageData = (data: ChartDataResult, range: number) => {
  const arr: ChartDataItem[] = []

  data.forEach((item, index) => {
    const rangeItem = (range - 1) / 2

    if (index - rangeItem < 0 || index + rangeItem > data.length - 1) {
      arr.push(item)
    } else {
      let averageSum = 0

      for (let i = index - rangeItem; i < index + rangeItem + 1; i++) {
        averageSum += data[i][1]
      }

      arr.push([item[0], averageSum / range])
    }
  })

  return arr
}
