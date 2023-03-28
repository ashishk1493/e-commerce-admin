import * as React from 'react';
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import { styled, alpha } from '@mui/material/styles'
import { useEffect } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'fit-content',
    border: '1px solid #efefef',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1)
  }
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '25ch',
      height: '33px'
    }
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

export default function AnqTableSearchWithDebuger(props) {
  const { onSearch } = props
  const [temp, setTemp] = React.useState('')

  let cleareAllTimeout = () => {
    var id = window.setTimeout(function () { }, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }

  let myGreeting = () => {
    onSearch(temp)
  }

  useEffect(() => {
    cleareAllTimeout()
    const myTimeout = setTimeout(myGreeting, 500);
    function myStopFunction(myTimeout) {
      clearTimeout(myTimeout);
    }
  }, [temp])

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        {...props}
        fullWidth
        disableUnderline
        placeholder="Search"
        onChange={(e) => {
          setTemp(e.target.value)
        }}
      />
    </Search>
  );
}