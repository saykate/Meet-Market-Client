import { SERVER_URL } from "./config";

export type GetUserRequest = {
  userId: string;
  token: string;
};

export const user = async ({ userId, token }: GetUserRequest) => {
  if (!token) {
    throw new Error("No token, authorization denied");
  }

  const res = await fetch(`${SERVER_URL}/users/${userId}`, {
    headers: {
      Authorization: token,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to get user");
  }

  const { data } = await res.json();
  return data;
};

export const listOfUsers = async () => {
  const res = await fetch(`${SERVER_URL}/users`);

  if (!res.ok) {
    throw new Error("Failed to get users");
  }

  const { data } = await res.json();
  return data;
};

export const userLists = async ({ userId, token }: GetUserRequest) => {
  if (!token) {
    throw new Error("No token, user not authorized");
  }

  const res = await fetch(`${SERVER_URL}/users/${userId}/lists`, {
    headers: {
      Authorization: token,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to get user's lists");
  }

  const { data } = await res.json();
  return data;
};

export const userMessages = async ({ userId, token }: GetUserRequest) => {
  if (!token) {
    throw new Error("No token, user not authorized");
  }

  const res = await fetch(`${SERVER_URL}/users/${userId}/messages`, {
    headers: {
      Authorization: token,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to get user's messages");
  }

  const { data } = await res.json();
  return data;
};

//TODO:
/* export const updateUser = async ({ userId, token }: GetUserRequest) => {
  if (!token) {
    throw new Error("No token, user not authorized");
  }

  const res = await fetch(`${SERVER_URL}/users/${userId}`, {
    method: "PUT", 
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ })
  });

  if (!res.ok) {
    throw new Error("Failed to update user");
  }
}; */