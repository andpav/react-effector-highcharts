import axios from 'axios'

export type ChartDataItem = [number, number]
export type ChartDataResult = Array<ChartDataItem>

export const getChartData = async ({ start, end }: { start: number; end: number }): Promise<ChartDataResult> => {
  const { data } = await axios.request<Array<{ date: number; weightedAverage: number }> | { error: string }>({
    url: 'https://poloniex.com/public',
    params: {
      command: 'returnChartData',
      currencyPair: 'USDT_BTC',
      start,
      end,
      period: 86400,
    },
  })
  if (!Array.isArray(data)) return []
  return data.map((item) => [item.date * 1000, item.weightedAverage])
}
