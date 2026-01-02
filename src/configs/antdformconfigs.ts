import { FormProps } from 'antd'

export const antdFormConfig: FormProps = {
  layout: "vertical",
  wrapperCol: { span: 24 },
  labelCol: { span: 24 },
  autoComplete: "off",
  size: "large",
  requiredMark: false, // Opcional: quitar asteriscos
  colon: false, // Opcional: quitar dos puntos
};