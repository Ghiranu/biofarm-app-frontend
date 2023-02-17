import React, { useState } from "react";

const useEditProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditProductModal = () => setIsModalOpen((prev) => !prev);

  return { isModalOpen, handleEditProductModal };
};

export default useEditProduct;
