import { useContext } from "react";
import { CategoryModalContext } from "../context/categoryModalContext";

const useCategoryModal = () => {
  return useContext(CategoryModalContext);
};

export default useCategoryModal;
