import { SERVER_URL } from "./config";

export const addCatToList = async ({
  listId,
  catId,
  token,
}: {
  listId: string;
  catId: string;
  token: string;
}) => {
  const res = await fetch(`${SERVER_URL}/lists/${listId}`, {
    method: "PUT",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category_id: catId }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Failed to fetch list: ${errorData.message}`);
  }

  const { data } = await res.json();
  return data;
};
