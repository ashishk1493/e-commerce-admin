import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const modelStyle = {
  opacity: 0.3
};

export default function BasicModal(props) {
  const { open, handleClose } = props
  return (
    <div style={modelStyle}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {props.children}
      </Modal>
    </div>
  );
}