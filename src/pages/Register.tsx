import Form from "../components/FormComponent";
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
  {
    colSpan: 2,
    label: "confirmPassword",
    type: "text",
    name: "confirmPassword",
    placeholder: "",
    isRequired: true,
  },
];

const Register = () => {
  const { loading, register } = useRegister();

  const handleRegister = async ({
    username,
    password,
    confirmPassword,
  }: RegisterFormData) => {
    await register({ username, password, confirmPassword });
  };

  return (
    <Form
      title="Register"
      subtitle="Welcome to the Meet Market!"
      inputs={inputs}
      submit={handleRegister}
      cta="Register"
      initState={initState}
      loading={loading}
    />
  );
};

export default Register;
