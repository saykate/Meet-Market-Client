import { FC } from 'react';

interface InputProps {
  type: string, 
  name: string, 
  value: string,
  placeholder: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = ({ 
  type, 
  name,
  value, 
  placeholder, 
  onChange }) => {
    return (
        <div className='inputContainer'>
            <label htmlFor={name}>{name}</label>
            <input type={type} name={name} id={name} value={value} placeholder={placeholder} onChange={onChange} />
        </div>
    )
}

export default Input