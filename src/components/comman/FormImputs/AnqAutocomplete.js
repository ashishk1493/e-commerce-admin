import * as React from 'react';
// import { styled } from '@mui/material/styles'
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';

// const RootWraper = styled('div')(({ theme }) => ({
//   // position: 'relative',
//   // borderRadius: theme.shape.borderRadius,
//   // backgroundColor: alpha(theme.palette.common.white, 0.15),
//   // '&:hover': {
//   //   backgroundColor: alpha(theme.palette.common.white, 0.25)
//   // },
//   // marginRight: theme.spacing(2),
//   // marginLeft: 0,
//   // width: '100%',
//   // [theme.breakpoints.up('sm')]: {
//   //   marginLeft: theme.spacing(3),
//   //   width: 'fit-content',
//   //   border: '1px solid #efefef',
//   //   marginTop: theme.spacing(3),
//   //   marginBottom: theme.spacing(3)
//   // }
// }))

// const ANQautocomplete = styled(Autocomplete)(({ theme }) => ({
//   // color: 'inherit',
//   // '& .MuiInputBase-input': {
//   //   padding: theme.spacing(1, 1, 1, 0),
//   //   // vertical padding + font size from searchIcon
//   //   paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//   //   transition: theme.transitions.create('width'),
//   //   width: '100%',
//   //   [theme.breakpoints.up('md')]: {
//   //     width: '25ch',
//   //     height: '33px'
//   //   }
//   // }
// }))

export default function AnqAutocomplete(props) {
  const { renderInput, label } = props;
  return (
    <div>
      <Autocomplete
        {...props}
        fullwidth={'true'}
        renderInput={renderInput ? renderInput : (params) => <TextField {...params} label={label ? label : ''} />}
      />
    </div>
  );
}
