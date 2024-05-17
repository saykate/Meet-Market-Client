import { SERVER_URL } from "./config";


export const createMessage = async (
  token: string, 
  authorId: string, 
  recipientId: string, 
  text: string,
) => {
  if (!token) {
    throw new Error("No token, authorization denied");
  }
  
  console.log("createMessage", {token, authorId, recipientId, text})
  const res = await fetch(`${SERVER_URL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      authorId,
      recipientId, 
      text,
    })
  });
  //make a variable and then return 
  return res.json()
};

export const getMessage = async (token: string, _id: string) => {
  if (!token) {
    throw new Error("No token, authorization denied");
  }

  const res = await fetch(`${SERVER_URL}/messages/${_id}`, {
    method: "GET",
    headers: {
      Authorization: token,
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
      Authorization: token,
    },
  });
  return res.json()
};
