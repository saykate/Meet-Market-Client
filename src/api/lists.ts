import { SERVER_URL } from "./config";

export type ReqOptions = {
  listId: string;
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

export const addListItem = async ({ listId, catId, token }: ReqOptions) => {
  const res = await fetch(`${SERVER_URL}/lists/${listId}`, {
    method: "PUT",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category_id: catId }),
  });

return handleRes(res)  
}

export const deleteListItem = async ({ listId, catId, token }: ReqOptions) => {
  const res = await fetch(`${SERVER_URL}/lists/${listId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category_id: catId }),
  });

  return handleRes(res)
};

export const findUsersByCategory = async (categoryId: string, token: string) => {
  const res = await fetch(`${SERVER_URL}/lists/category/${categoryId}/users`, {
    method: "GET",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });

  return handleRes(res)
};
