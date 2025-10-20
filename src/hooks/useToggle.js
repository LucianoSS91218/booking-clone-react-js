import { useState } from "react";

export const useToggle = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);

  const openDropdownOrModal = () => setIsOpen(true);

  const closeDropdownOrModal = () => setIsOpen(false);

  return [isOpen, openDropdownOrModal, closeDropdownOrModal];
};
