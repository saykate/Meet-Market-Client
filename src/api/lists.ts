import { SERVER_URL } from "./config";

export const addDeptToList = async ({
  listId, 
  deptId,
  token,
}: {
  listId: string;
  deptId: string;
  token: string;
}) => {
  const res = await fetch(`${SERVER_URL}/lists/${listId}`, {
    method: "PUT",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ department_id: deptId }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch list");
  }

  const { data } = await res.json();
  return data;
};