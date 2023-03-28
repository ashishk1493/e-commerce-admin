import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Stack } from '@mui/material';
// import { Stack } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  borderRadius: '20px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
const modelStyle = {
  opacity: 0.3,
};

export default function CommonDeleteModel(props) {
  // const { selectedobjRow, open, handleClose, value, tableMeta, onSubmit, updateValue } = props;
  const { open, handleClose, onSubmit } = props;
  console.log(props, 'selectedobjRow');
  return (
    <div style={modelStyle}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={3}>
            <Typography variant="h4"> Are you sure?</Typography>
            <p>You will not be able to recover this imaginary file!</p>

            <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
              <Button color="inherit" variant="outlined" onClick={handleClose}>
                Close
              </Button>
              <LoadingButton type="submit" variant="contained" onClick={() => onSubmit(props.selectedobjRow)}>
                Delete
              </LoadingButton>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
