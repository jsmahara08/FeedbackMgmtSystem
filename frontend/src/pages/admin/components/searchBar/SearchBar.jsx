import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const SearchBar = ({searchEvent}) => {
  return (
     <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch'},
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-search" label="Search..." type="search" onChange={searchEvent} />
    </Box>
  )
}

export default SearchBar
