import { Box, Modal } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { toast } from 'react-hot-toast';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  component: React.ElementType;
  setRoute: (route: string) => void;
};

const CustomModal: FC<Props> = ({
  open,
  setOpen,
  setRoute,
  component: Component,
}) => {
  const handleCloseModal = () => {
    setOpen(false);
    setRoute('Login');
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box className='absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none'>
        <Component setOpen={setOpen} setRoute={setRoute} />
      </Box>
    </Modal>
  );
};

export default CustomModal;
