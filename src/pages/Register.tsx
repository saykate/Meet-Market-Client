import Form from "../components/Form";
import useRegister, { RegisterFormData } from "../hooks/useRegister";

const initState = {
  username: "",
  password: "",
  confirmPassword: "",
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
  },
  {
    type: "text", 
    name: "confirmPassword", 
    label: "confirmPassword", 
    isRequired: true,
  }
]

const Register = () => {
  const { loading, register } = useRegister();

  const handleRegister = async ({ username, password, confirmPassword }: RegisterFormData) => {
    await register({ username, password, confirmPassword });
  };

  return (
    <Form 
      title="Register"
      subTitle="Welcome to the Meet Market!"
      inputs={inputs}
      submit={handleRegister}
      cta="Register"
      initState={initState}
      loading={loading}
    />
  );
};

export default Register;