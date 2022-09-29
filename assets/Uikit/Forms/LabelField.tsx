import { PdvIcons, TIconNames, TIconSizes } from '@Uikit/PdvIcons'

export type TLabelField = {
  label?: string
  for?: string
  labelClassName?: string
  labelIcon?: TIconNames
  labelIconSize?: TIconSizes
}

export const LabelField = (props: TLabelField) => {
  if (!props?.label) return null

  return (
    <div className="flex items-center">
      <PdvIcons name={props?.labelIcon ?? 'KeyArrowRight'} color="blue-500" size={props?.labelIconSize} />

      <label className={`body1 block font-semibold text-gray-500 ${props.labelClassName ? props.labelClassName : ''}`} htmlFor={props.for}>
        {props.label}
      </label>
    </div>
  )
}

export default LabelField
