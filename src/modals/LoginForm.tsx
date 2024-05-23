import FormComponent from "../components/FormComponent";
import useLogin, { LoginFormData } from "../hooks/useLogin";

const initState = {
  username: "",
  password: "",
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
];

type LoginFormProps = {
  onRegisterOpen: () => void;
  onClose: () => void;
};

const LoginForm = ({ onRegisterOpen, onClose }: LoginFormProps) => {
  const { loading, error, login } = useLogin(onClose);

  const handleLogin = async ({ username, password }: LoginFormData) => {
    await login({ username, password });
  };

  return (
    <FormComponent
      title="Login"
      subtitle="Welcome Back!"
      inputs={inputs}
      submit={handleLogin}
      cta="Login"
      initState={initState}
      linkPrompt="Don't have an account?"
      linkAction={onRegisterOpen}
      linkText="Sign Up"
      loading={loading}
      error={error}
    />
  );
};

export default LoginForm;
