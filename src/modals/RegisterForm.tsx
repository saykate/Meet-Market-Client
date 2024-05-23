import FormComponent from "../components/FormComponent";
import useRegister, { RegisterFormData } from "../hooks/useRegister";

const initState = {
  username: "",
  password: "",
  confirmPassword: "",
};

const inputs = [
  {
    colSpan: 2,
    label: "Username",
    type: "text",
    name: "username",
    id: "username",
    placeholder: "Enter username",
    isRequired: true,
  },
  {
    colSpan: 2,
    label: "Password",
    type: "password",
    name: "password",
    id: "password",
    placeholder: "Enter password",
    isRequired: true,
  },
  {
    colSpan: 2,
    label: "Confirm Password",
    type: "password",
    name: "confirmPassword",
    id: "confirmPassword",
    placeholder: "Confirm password",
    isRequired: true,
  },
];

type RegisterFormProps = {
  onReturnToLogin: () => void;
  onClose: () => void;
};

const RegisterForm = ({ onReturnToLogin, onClose }: RegisterFormProps) => {
  const { loading, error, register } = useRegister(onClose);

  const handleRegister = async ({
    username,
    password,
    confirmPassword,
  }: RegisterFormData) => {
    await register({ username, password, confirmPassword });
  };

  return (
    <FormComponent
      title="Register"
      subtitle="Create an Account"
      inputs={inputs}
      submit={handleRegister}
      cta="Register"
      initState={initState}
      linkPrompt="Return to Login"
      linkAction={onReturnToLogin}
      linkText="Login"
      loading={loading}
      error={error}
    />
  );
};

export default RegisterForm;
