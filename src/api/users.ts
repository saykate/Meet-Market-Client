import { SERVER_URL } from "./config";

export type GetUserRequest = {
  userId?: string;
  token: string;
};

export type UserData = {
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
  birthdate: Date;
  profilePhoto: string;
  coverPhoto: string;
}

export const getUser = async ({ userId, token }: GetUserRequest) => {
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

export const listOfUsers = async ({ token }: GetUserRequest) => {
  const res = await fetch(`${SERVER_URL}/users`, {
    headers: {
      Authorization: token,
  },
});

  if (!res.ok) {
    throw new Error("Failed to get users");
  }

  const { data } = await res.json();
  return data;
};

export const getUserLists = async ({ userId, token }: GetUserRequest) => {
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

export const getUserMessages = async ({ userId, token }: GetUserRequest) => {
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

export const updateUser = async ({ userId, token }: GetUserRequest, userData: UserData) => {
  if (!token) {
    throw new Error("No token, user not authorized");
  }

  const res = await fetch(`${SERVER_URL}/users/${userId}`, {
    method: "PUT", 
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  if (!res.ok) {
    throw new Error("Failed to update user");
  }
};