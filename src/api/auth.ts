import { SERVER_URL } from "./config";

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const res = await fetch(`${SERVER_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Failed to login");
  }

  const { data } = await res.json();
  console.log(data);
  return data;
};

export const register = async ({
  username,
  password,
  confirmPassword,
}: {
  username: string;
  password: string;
  confirmPassword: string;
}) => {
  const res = await fetch(`${SERVER_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, confirmPassword }),
  });

  if (!res.ok) {
    throw new Error("Failed to register");
  }

  const { data } = await res.json();
  return data;
};
