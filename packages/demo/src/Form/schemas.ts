import {
  getCascaderData,
  getRadioData,
  getSelectData,
  getTreeSelectData,
} from '../apis/form'
import { DevexpsFormSchema } from '@devexps/devexpscmps/src/form'
import { ref } from 'vue'
export const selectParams = ref({ id: 1 })
export const BasicProps: DevexpsFormSchema[] = [
  {
    field: 'name',
    label: 'Input',
    component: 'Input',
    defaultValue: '111',
    required: true,
    componentProps: {
      placeholder: 'Basic Input',
    },
  },
  {
    field: 'name',
    label: 'Span demo',
    gridItemProps: {
      span: 20,
    },
    component: 'Input',
    defaultValue: '111',
    required: true,
    componentProps: {
      placeholder: 'Basic Input',
    },
  },
  {
    field: 'name',
    label: 'Label demo',
    gridItemProps: {
      span: 20,
    },
    labelProps: {
      labelPlacement: 'left',
    },
    component: 'Input',
    defaultValue: '111',
    required: true,
    componentProps: {
      placeholder: 'Basic Input',
    },
  },
  {
    gridItemProps: {
      span: 20,
    },
    field: 'user.name',
    label: 'User Name',
    component: 'Input',
    componentProps: {
      placeholder: 'Basic Input',
    },
  },
  {
    field: 'number',
    label: 'InputNumber',
    component: 'InputNumber',
    componentProps: {
      placeholder: 'Basic InputNumber',
    },
  },
  {
    field: 'password',
    label: 'InputPassword',
    component: 'InputPassword',
    componentProps: {
      placeholder: 'Basic InputPassword',
    },
    rule: {
      required: true,
      trigger: ['input', 'blur'],
    },
  },
  {
    field: 'textArea',
    label: 'InputTextArea',
    component: 'InputTextArea',
    componentProps: {
      placeholder: 'Basic InputTextArea',
    },
  },
  {
    field: 'sex.aa.bb',
    label: 'Select',
    component: 'Select',
    componentProps: {
      placeholder: 'Basic Select',
      api: getSelectData,
      params: selectParams,
    },
  },
  {
    field: 'treeSelect',
    label: 'TreeSelect',
    component: 'TreeSelect',

    componentProps: {
      placeholder: 'Basic TreeSelect',
      api: getTreeSelectData,
      params: selectParams,
    },
  },
  {
    field: 'radioGroup',
    label: 'RadioGroup',
    component: 'RadioGroup',
    componentProps: {
      type: 'button',
      api: getRadioData,
      params: selectParams,
    },
  },
  {
    field: 'checkboxGroup',
    label: 'CheckboxGroup',
    component: 'CheckboxGroup',
    componentProps: {
      type: 'button',
      options: [
        { label: 'Label 1', checked: true, value: 1 },
        { label: 'Label 2', checked: false, value: 2 },
      ],
      api: getRadioData,
      params: selectParams,
    },
  },
  {
    field: 'autoComplete',
    label: 'AutoComplete',
    component: 'AutoComplete',
    componentProps: {
      options: ['@qq.com', '@gmail.com', '@163.com'],
      split: '@',
      // api: getRadioData,
      // params: selectParams,
    },
  },
  {
    field: 'cascader',
    label: 'Cascader',
    component: 'Cascader',
    componentProps: {
      api: getCascaderData,
      params: selectParams,
      // options: ['11'],
    },
  },
  {
    field: 'datePicker',
    label: 'DatePicker',
    component: 'DatePicker',
    componentProps: {},
  },
  {
    field: 'timePicker',
    label: 'TimePicker',
    component: 'TimePicker',
    componentProps: {},
  },
  {
    field: 'divider',
    label: 'Divider',
    component: 'Divider',
    componentProps: {},
  },
  {
    field: 'switch',
    label: 'Switch',
    component: 'Switch',
    componentProps: {},
  },
  {
    field: 'rate',
    label: 'Rate',
    component: 'Rate',
    componentProps: {},
  },
  {
    field: 'slider',
    label: 'Slider',
    component: 'Slider',
    componentProps: {},
  },
  {
    field: 'colorPicker',
    label: 'ColorPicker',
    component: 'ColorPicker',
    componentProps: {},
  },
  {
    field: 'dynamicTags',
    label: 'DynamicTags',
    component: 'DynamicTags',
    componentProps: {},
  },
  {
    field: 'transfer',
    label: 'Transfer',
    component: 'Transfer',
    componentProps: {},
  },
  //TODO Upload
  // {
  //   field: 'upload',
  //   label: 'Upload',
  //   component: 'Upload',
  //   componentProps: {},
  // },
  {
    field: 'mention',
    label: 'Mention',
    component: 'Mention',
    componentProps: {},
  },
]

export const FormilyProps = {
  u2g5b1my8ql: {
    type: 'string',
    title: 'Input',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
    'x-validator': [],
    'x-component-props': {},
    'x-decorator-props': {},
    'x-designable-id': 'u2g5b1my8ql',
    'x-index': 0,
  },
  n8yqg4uir5d: {
    type: 'string',
    title: 'TextArea',
    'x-decorator': 'FormItem',
    'x-component': 'Input.TextArea',
    'x-validator': [],
    'x-component-props': {},
    'x-decorator-props': {},
    'x-designable-id': 'n8yqg4uir5d',
    'x-index': 1,
  },
  '5ztjug2ckdn': {
    title: 'Password',
    'x-decorator': 'FormItem',
    'x-component': 'Password',
    'x-validator': [],
    'x-component-props': {},
    'x-decorator-props': {},
    'x-designable-id': '5ztjug2ckdn',
    'x-index': 2,
  },
  v6dki7fcfaa: {
    type: 'number',
    title: 'fff',
    'x-decorator': 'FormItem',
    'x-component': 'NumberPicker',
    'x-validator': [],
    'x-component-props': {},
    'x-decorator-props': {},
    'x-designable-id': 'v6dki7fcfaa',
    'x-index': 3,
  },
  o26l5e8cy0d: {
    type: 'number',
    title: 'Slider',
    'x-decorator': 'FormItem',
    'x-component': 'Slider',
    'x-validator': [],
    'x-component-props': {},
    'x-decorator-props': {},
    'x-designable-id': 'o26l5e8cy0d',
    'x-index': 4,
  },
}
