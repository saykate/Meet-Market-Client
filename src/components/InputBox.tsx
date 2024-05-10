import { FC } from "react";
import { FormControl, FormLabel, Input, GridItem } from "@chakra-ui/react";

export type InputProps = {
  colSpan: number;
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  isRequired: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputBox: FC<InputProps> = ({
  colSpan,
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  isRequired,
}) => {
  return (
    <GridItem colSpan={colSpan}>
      <FormControl>
        <FormLabel htmlFor={name}>{label}: </FormLabel>
        <Input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          isRequired={isRequired}
        />
      </FormControl>
    </GridItem>
  );
};

export default InputBox;
