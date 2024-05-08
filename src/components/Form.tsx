import React, { FC, useState } from "react";
import Input, { InputProps } from "./Input";

export type InputItem = Omit<InputProps, "onChange" | "value">;

type FormProps = {
  title: string;
  subTitle: string;
  inputs: InputItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submit: (formData: any) => void;
  cta: string;
  initState: Record<string, string>;
  linkPrompt?: string;
  link?: string;
  linkText?: string;
  loading: boolean;
};

const Form: FC<FormProps> = ({
  title,
  subTitle,
  inputs,
  submit,
  cta,
  initState,
  linkPrompt,
  link,
  linkText,
  loading,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>(initState);

  const validate = () => {
    return Object.values(formData).every((val) => val);
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
    <div>
      <div>
        <h1>{title}</h1>
        <p>{subTitle}</p>
      </div>
      <div>
        <form>
          {inputs.map((input, idx) => (
            <Input
              key={idx}
              {...input}
              value={formData[input.name]}
              onChange={handleChange}
            />
          ))}
          <button type="button" disabled={loading} onClick={handleSubmit}>
            {cta}
          </button>
        </form>
      </div>
      {linkPrompt && link && linkText && (
        <div>
          <p>
            {linkPrompt} <a href={link}>{linkText}</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Form;
