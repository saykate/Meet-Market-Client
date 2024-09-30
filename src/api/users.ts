import { SERVER_URL } from "./config";
import { Message } from "../hooks/useGetUserConversations";

export type GetUserRequest = {
  userId?: string;
  token: string;
};

export type UserData = {
  _id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  birthdate?: Date;
  profilePhoto?: string;
  coverPhoto?: string;
};

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

export const getUserCategories = async ({ userId, token }: GetUserRequest) => {
  if (!token) {
    throw new Error("No token, user not authorized");
  }

  const res = await fetch(`${SERVER_URL}/users/${userId}/categories`, {
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

export const getUserSentMessages = async ({
  userId,
  token,
}: GetUserRequest) => {
  const allMessages = await getUserMessages({ userId, token });

  const sentMessages = allMessages.filter(
    (message: Message) => message.author._id === userId
  );
  return sentMessages;
};

export const updateUser = async (
  { userId, token }: GetUserRequest,
  userData: UserData
) => {
  if (!token) {
    throw new Error("No token, user not authorized");
  }

  const res = await fetch(`${SERVER_URL}/users/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error("Failed to update user");
  }
};

export const followUser = async ({ userId, targetUserId, token }: { userId: string, targetUserId: string; token: string }) => {
  if (!token) {
    throw new Error("No token, user not authorized");
  }

  const res = await fetch(`${SERVER_URL}/users/follow`, {
    method: 'POST',
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, targetUserId }),
  });

  if (!res.ok) {
    throw new Error("Failed to follow user");
  }

  const { data } = await res.json();
  return data;
};

export const getUserFollowers = async ({ userId, token }: GetUserRequest) => {
  if (!token) {
    throw new Error("No token, user not authorized");
  }

  const res = await fetch(`${SERVER_URL}/users/${userId}/followers`, {
    headers: {
      Authorization: token,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to get user's followers");
  }

  const { data } = await res.json();  
  return data;
};

export const getUserFollowing = async ({ userId, token }: GetUserRequest) => {
  if (!token) {
    throw new Error("No token, user not authorized");
  }

  const res = await fetch(`${SERVER_URL}/users/${userId}/following`, {
    headers: {
      Authorization: token,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to get user's following");
  }

  const { data } = await res.json();
  return data;
};
