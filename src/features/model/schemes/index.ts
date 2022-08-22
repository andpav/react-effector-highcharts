import { date, object, InferType } from 'yup'

export const datesValidationScheme = object({
  from: date().required('required').min(new Date(2015, 2, 19), 'not so old'),
  to: date()
    .required('reqiured')
    .max(new Date(), 'should be today or earlier')
    .when(
      'from',
      (from, yup) =>
        from && yup.min(from, 'end date cannot be before start date')
    )
})

export type DateValidationScheme = InferType<typeof datesValidationScheme>
