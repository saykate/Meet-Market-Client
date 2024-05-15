import Form from "../components/FormComponent";
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
    placeholder: "",
    isRequired: true,
  },
  {
    colSpan: 2,
    label: "Password",
    type: "text",
    name: "password",
    placeholder: "",
    isRequired: true,
  },
];

const Login = () => {
  const { loading, login } = useLogin();

  const handleLogin = async ({ username, password }: LoginFormData) => {
    await login({ username, password });
  };

  return (
    <Form
      title="Login"
      subtitle="Welcome Back!"
      inputs={inputs}
      submit={handleLogin}
      cta="Login"
      initState={initState}
      linkPrompt="Don't have an account?"
      link="/register"
      linkText="Sign Up"
      loading={loading}
    />
  );
};

export default Login;
