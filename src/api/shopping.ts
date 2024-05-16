import { SERVER_URL } from "./config";

export type DepartmentData = {
  _id: string;
  title: string;
  photo: string;
}

export const getDepartments = async () => {

  const res = await fetch(`${SERVER_URL}/departments`, {
    method: "GET",
  });
  const { data } = await res.json()
  return data
};

export const getDepartmentCategories = async (_id: string) => {

  const res = await fetch(`${SERVER_URL}/departments/${_id}`, {
    method: "GET",
  });
  const { data } = await res.json()
  return data
};
