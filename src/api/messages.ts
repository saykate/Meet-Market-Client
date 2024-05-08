import { SERVER_URL } from "./config";

export const createMessage = async (token: string) => {
  if (!token) {
    throw new Error("No token, authorization denied");
  }

  await fetch(`${SERVER_URL}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  });
  
};

export const getMessage = async (token: string, _id: string) => {
  if (!token) {
    throw new Error("No token, authorization denied");
  }

  const res = await fetch(`${SERVER_URL}/messages/${_id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { data } = await res.json()
  return data
};

export const deleteMessage = async (token: string, _id: string) => {
  if (!token) {
    throw new Error("No token, authorization denied");
  }

  const res = await fetch(`${SERVER_URL}/messages/${_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json()
};
