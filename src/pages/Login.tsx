import Form from "../components/Form";
import useLogin, { LoginFormData } from "../hooks/useLogin";

const initState = {
  username: "",
  password: "",
};

const inputs = [
  {
    type: "text", 
    name: "username", 
    label: "Username", 
    isRequired: true,
  },
  {
    type: "text", 
    name: "password", 
    label: "Password", 
    isRequired: true,
  }
]

const Login = () => {
  const { loading, login } = useLogin();

  const handleLogin = async ({ username, password }: LoginFormData) => {
    await login({ username, password });
  };

  return (
    <Form 
      title="Login"
      subTitle="Welcome Back!"
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
