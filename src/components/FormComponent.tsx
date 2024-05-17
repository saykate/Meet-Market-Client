import React, { FC, useState, useEffect } from "react";
import {
  VStack,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  Button,
} from "@chakra-ui/react";
import InputBox, { InputProps } from "./InputBox";

export type InputItem = Omit<InputProps, "onChange" | "value"> & { isRequired?: boolean};

type FormProps = {
  title: string;
  subtitle?: string;
  inputs: InputItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submit: (formData: any) => void;
  cta: string;
  initState: Record<string, string>;
  linkPrompt?: string;
  linkAction?: () => void;
  linkText?: string;
  loading: boolean;
};

const FormComponent: FC<FormProps> = ({
  title,
  subtitle,
  inputs,
  submit,
  cta,
  initState,
  linkPrompt,
  linkAction,
  linkText,
  loading,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>(initState);

  useEffect(() => {
    setFormData(initState);
  }, [initState]);

  const validate = () => {
    return inputs.every((input) => {
      if (input.isRequired) {
        return Boolean(formData[input.name]);
      }
      return true; 
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validate()) {
      alert("Please fill out all fields");
      return;
    }
    submit(formData);
    setFormData(initState);
    };

  return (
    <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
      <VStack spacing={3} alignItems="flex-start">
        <Heading size="2xl">{title}</Heading>
        {subtitle && <Text>{subtitle}</Text>}
      </VStack>
      <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
        {inputs.map((input, idx) => (
          <InputBox
            key={idx}
            {...input}
            value={formData[input.name]}
            onChange={handleChange}
          />
        ))}
        <GridItem colSpan={2}>
          <Button size="lg" w="full" disabled={loading} onClick={handleSubmit}>
            {cta}
          </Button>
        </GridItem>
        {linkPrompt && linkAction && linkText && (
        <GridItem colSpan={2}>
          <Text>
            {linkPrompt} <Button onClick={linkAction}>{linkText}</Button>
          </Text>
        </GridItem>
      )}
      </SimpleGrid>
    </VStack>
  );
};

export default FormComponent;
