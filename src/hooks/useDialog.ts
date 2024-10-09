import { useState, useCallback } from 'react';

type UseDialogReturnType = {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
};

export const useDialog = (): UseDialogReturnType => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openDialog = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    openDialog,
    closeDialog,
  };
};
