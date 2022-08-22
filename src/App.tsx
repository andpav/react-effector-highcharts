import * as React from 'react'
import { useStore } from 'effector-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Chart } from './features/chart'
import {
  setRange,
  $chartData,
  $averagedChartData,
  $chartShowing,
  $range,
  changeFromOrTo,
  datesValidationScheme,
  DateValidationScheme,
} from './features/model'

export default function App() {
  const chartData = useStore($chartData)
  const averagedChartData = useStore($averagedChartData)
  const chartShowing = useStore($chartShowing)
  const range = useStore($range)

  const {
    register,
    formState: { errors },
    formState,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(datesValidationScheme),
    defaultValues: { from: new Date(), to: new Date() },
  })

  const { dirtyFields } = formState
  const { from: fromTouched, to: toTouched } = dirtyFields
  const { from: fromError, to: toError } = errors

  const onSubmit = (data: DateValidationScheme) => changeFromOrTo(data)
  const submit = handleSubmit(onSubmit)

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div>
          <input type="date" {...register('from')} onChange={submit} />
          {fromTouched && <div style={{ color: 'red', fontSize: '12px' }}>{fromError?.message}</div>}
        </div>
        <div>
          <input type="date" {...register('to')} onChange={submit} />
          {toTouched && <div style={{ color: 'red', fontSize: '12px' }}>{toError?.message}</div>}
        </div>
        <select defaultValue={range} onChange={(e) => setRange(e.currentTarget.value)}>
          <option>1d</option>
          <option>3d</option>
          <option>5d</option>
          <option>7d</option>
        </select>
      </div>
      {chartShowing ? <Chart data={chartData} average={averagedChartData} /> : null}
    </div>
  )
}
