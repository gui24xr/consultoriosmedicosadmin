import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'

interface InputSearchProps {
  placeholder?: string;
  value: string; 
  onChangeFunction: (value: string) => void;
}

export default function InputSearch({
  placeholder = 'Buscar...',
  value,
  onChangeFunction,
}: InputSearchProps) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFunction(e.target.value);
  }

  return (
    <Input
      placeholder={placeholder}
      prefix={<SearchOutlined />}
      value={value} // Conectar el value
      onChange={handleChange}
      allowClear // Para poder limpiar
      size="large"
    />
  )
}