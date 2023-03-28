import { Box, Button, Grid, TableCell, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import React from 'react';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import * as yup from 'yup';
import FormikCommanNew from '../../../comman/FormikCommanNew';
import { TableContainer, Table, TableHead, TableRow, TableBody } from '@mui/material';
import {} from '@mui/material';
import {} from '@mui/material';
import {} from '@mui/material';
import {} from '@mui/material';
import { Paper } from '@mui/material';

const style = {
  position: 'absolute',
  borderRadius: '10px',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 750,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
const modelStyle = {
  opacity: 0.3,
};
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Total Messages:',0),
  createData('Total Clicked:',0)
];

const FormInfoModel = (props) => {
  const { open, handleClose, user } = props;

 const handleTracking = () => {
    console.log('call traking')
    handleClose()
 }
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
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h5">Form Stats</Typography>
              <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                <Button color="inherit" variant="text" onClick={handleClose}>
                  <CloseIcon />
                </Button>
              </Stack>
            </div>
           
              <TableContainer component={Paper} style={{
                borderRadius:0
              }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  {/* <TableHead>
                    <TableRow>
                      <TableCell>Dessert (100g serving)</TableCell>
                      <TableCell align="right">Calories</TableCell>
                      <TableCell align="right">Fat&nbsp;(g)</TableCell>
                      <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                      <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                  </TableHead> */}
                  <TableBody style={{
                    borderRadius:0
                  }}>
                    {rows.map((row) => (
                    //   <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 1 } }}>
                    <TableRow key={row.name} sx={{ border: 1}}>
                        <TableCell component="th" scope="row">
                          <b>{row.name}</b>
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            <Grid container style={{justifyContent:"end"}}>
              <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                <Button color="info" variant="contained" onClick={handleClose}>
                Generate Records CSV
                </Button>
                <Button type="button" variant="contained" onClick={handleTracking}>
                    Generate Tracking CSV
                </Button>
              </Stack>
            </Grid>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};
export default FormInfoModel;
