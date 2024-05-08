import { FC } from 'react';

export type InputProps = {
  type: string, 
  name: string, 
  label: string, 
  value: string,
  isRequired: boolean,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const Input: FC<InputProps> = ({ 
  type = 'text', 
  name,
  label,
  value, 
  onChange, 
  isRequired
}) => {
    return (
        <div>
            <label htmlFor={name}>{label}: </label>
            <input 
              type={type} 
              id={name}
              name={name} 
              value={value} 
              onChange={onChange}
              required={isRequired}
              />
        </div>
    )
}

export default Input