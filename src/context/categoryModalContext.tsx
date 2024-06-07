import React, { createContext, useState, FC } from 'react';
import { CategoryData } from '../api/shopping';

type CategoryModalContextProps = {
  selectedCategory: CategoryData | null;
  isModalOpen: boolean;
  openModal: (category: CategoryData) => void;
  closeModal: () => void;
  setSelectedCategory: (category: CategoryData) => void;
}

export const CategoryModalContext = createContext<CategoryModalContextProps>({
  selectedCategory: null, 
  isModalOpen: false, 
  openModal: () => {}, 
  closeModal: () => {},
  setSelectedCategory: () => {}, 
});

type Props = { 
  children: React.ReactNode;
}

export const CategoryModalProvider: FC<Props> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (category: CategoryData) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setIsModalOpen(false);
  };

  return (
    <CategoryModalContext.Provider
      value={{ selectedCategory, setSelectedCategory, isModalOpen, openModal, closeModal }}
    >
      {children}
    </CategoryModalContext.Provider>
  );
};

export default CategoryModalProvider