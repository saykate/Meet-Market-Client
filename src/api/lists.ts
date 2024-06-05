import { SERVER_URL } from "./config";

export type ReqOptions = {
  userId?: string;
  catId: string;
  token: string;
}

const handleRes = async (res: Response) => {
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Failed to fetch list: ${errorData.message}`);
  }
  const { data } = await res.json();
  return data;
};

export const addUserCategory = async ({ userId, catId, token }: ReqOptions) => {
  const res = await fetch(`${SERVER_URL}/users/${userId}/categories`, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category_id: catId }),
  });

return handleRes(res)  
}

export const deleteUserCategory = async ({ userId, catId, token }: ReqOptions) => {
  const res = await fetch(`${SERVER_URL}/users/${userId}/categories/remove`, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category_id: catId }),
  });

  return handleRes(res)
};

export const findUsersByCategory = async ({catId, token}: ReqOptions) => {
  const res = await fetch(`${SERVER_URL}/users/categories/${catId}`, {
    method: "GET",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });

  return handleRes(res)
};
