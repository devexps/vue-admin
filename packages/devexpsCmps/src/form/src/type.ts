import type { CSSProperties, VNode } from 'vue'
import { formMethod } from '#/form/src/hooks/useForm'
export interface DevexpsFormProps {
  title?: string
  schemas: DevexpsFormSchema[]
  gridProps?: GridProps
  labelProps?: Omit<LabelProps, 'labelStyle'>
  rules?: object
  actions?: boolean
  actionsProps?: ActionProps
  submitFunc?: (FormRef?: formMethod) => void
}

export interface ActionProps extends GridProps {
  submitText?: String
  cancelText?: String
}

export interface LabelProps {
  labelPlacement?: 'left' | 'top'
  labelAlign?: 'left' | 'right'
  labelStyle?: CSSProperties | String
  labelWidth?: number | string | 'auto'
}
export interface GridProps {
  cols?: number
  span?: number
  xGap?: number
  yGap?: number
}
export interface GridItemProps {
  span?: number
  offset?: number
  suffix?: boolean
}

export interface DevexpsFormSchema {
  // Field name
  field: string
  // Event name triggered by internal value change, default change
  changeEvent?: string
  // Variable name bound to v-model Default value
  valueField?: string
  // Label name
  label: string | VNode
  labelProps?: LabelProps
  // Auxiliary text
  subLabel?: string
  gridItemProps?: GridItemProps

  rule?: object
  // Help text on the right side of the text
  // helpMessage?:
  //   | string
  //   | string[]
  //   | ((renderCallbackParams: RenderCallbackParams) => string | string[])
  // // BaseHelp component props
  // helpComponentProps?: Partial<HelpComponentProps>
  // // Label width, if it is passed, the labelCol and WrapperCol configured by itemProps will be invalid
  // labelWidth?: string | number
  // // Disable the adjustment of labelWidth with global settings of formModel, and manually set labelCol and wrapperCol by yourself
  // disabledLabelWidth?: boolean
  component: ComponentType
  componentProps?: object
  // | ((opt: {
  //     schema: FormSchema
  //     tableAction: TableActionType
  //     formActionType: FormActionType
  //     formModel: Recordable
  //   }) => Recordable)
  // | object
  // Required

  required?: boolean
  // required?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean)
  //
  // suffix?: string | number | ((values: RenderCallbackParams) => string | number)
  //
  // // Validation rules
  // rules?: Rule[]
  // // Check whether the information is added to the label
  // rulesMessageJoinLabel?: boolean
  //
  // // Reference formModelItem
  // itemProps?: Partial<FormItem>
  //
  // // col configuration outside formModelItem
  // colProps?: Partial<ColEx>
  //
  defaultValue?: any
  // isAdvanced?: boolean
  //
  // // Matching details components
  // span?: number
  //
  // ifShow?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean)
  //
  // show?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean)
  //
  // // Render the content in the form-item tag
  // render?: (
  //   renderCallbackParams: RenderCallbackParams,
  // ) => VNode | VNode[] | string
  //
  // // Rendering col content requires outer wrapper form-item
  // renderColContent?: (
  //   renderCallbackParams: RenderCallbackParams,
  // ) => VNode | VNode[] | string
  //
  // renderComponentContent?:
  //   | ((renderCallbackParams: RenderCallbackParams) => any)
  //   | VNode
  //   | VNode[]
  //   | string
  //
  // // Custom slot, in from-item
  slot?: string
  //
  // // Custom slot, similar to renderColContent
  // colSlot?: string
  //
  // dynamicDisabled?:
  //   | boolean
  //   | ((renderCallbackParams: RenderCallbackParams) => boolean)
  //
  // dynamicRules?: (renderCallbackParams: RenderCallbackParams) => Rule[]
}
export type ComponentType =
  | 'Input'
  | 'InputGroup'
  | 'InputPassword'
  | 'InputSearch'
  | 'InputTextArea'
  | 'InputNumber'
  | 'InputCountDown'
  | 'Select'
  // | 'ApiSelect'
  | 'TreeSelect'
  | 'ApiTree'
  // | 'ApiTreeSelect'
  // | 'ApiRadioGroup'
  // | 'RadioButtonGroup'
  | 'RadioGroup'
  // | 'Checkbox'
  | 'CheckboxGroup'
  | 'AutoComplete'
  // | 'ApiCascader'
  | 'Cascader'
  | 'DatePicker'
  // | 'MonthPicker'
  // | 'RangePicker'
  // | 'WeekPicker'
  | 'TimePicker'
  | 'Switch'
  | 'StrengthMeter'
  | 'Upload'
  | 'IconPicker'
  | 'Render'
  | 'Slider'
  | 'Rate'
  | 'Divider'
  | 'ColorPicker'
  | 'DynamicTags'
  | 'Transfer'
  | 'Mention'
  | 'DynamicInput'
