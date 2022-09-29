// import React from 'react'

// import Autocomplete from '@mui/material/Autocomplete'
// import { Controller } from 'react-hook-form'

// import { FormError, LabelField, IGenericField, ForwardedGenericInput } from './GenericFields'

// interface IComboField extends IGenericField {
//   comboOptions: TComboOption[]
//   onChange?: (item: TComboOption) => void
// }

// type TComboOption = {
//   label: string
//   value: string | number
// }

// const ComboField = (props: IComboField) => {
//   return (
//     <Controller
//       control={props.form.control}
//       name={props.name}
//       render={({ field: { ref, value, ...field } }) => {
//         return (
//           <Autocomplete
//             {...field}
//             onChange={(e, value) => {
//               field.onChange(value)
//               if (props.onChange && value) props.onChange(value)
//             }}
//             onInputChange={(_, value) => {
//               if (value) field.onChange(value)
//             }}
//             noOptionsText="No se encontraron resultados"
//             options={props.comboOptions}
//             isOptionEqualToValue={(option, value) => option.value === value.value}
//             renderInput={({ InputProps: { ref: anchorListRef }, inputProps: muiInputProps }) => (
//               <div ref={anchorListRef} className={props.className}>
//                 <div className={`flex gap-2 ${props?.labelPosition === 'left' ? 'flex-row' : 'flex-col'}`}>
//                   <LabelField {...props} />
//                   <ForwardedGenericInput form={props.form} name={props.name} inputProps={{ ...props?.inputProps, ...muiInputProps, ...field }} />
//                 </div>
//                 <FormError errorClassName={props.errorClassName} name={props.name} errors={props.form?.formState?.errors} />
//               </div>
//             )}
//           />
//         )
//       }}
//     />
//   )
// }

// export default ComboField
