import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const SearchBar = ({
  searchTerm,
  nodeName,
  onChange,
}) => {
  const placeholder = nodeName ? `Search in ${nodeName}` : 'Search';

  return (
    <Box sx={{ margin: '0.5em' }}>
      <TextField
        sx={{
          fontSize: '1em',
          width: '100%'
        }}
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        value={searchTerm}
        onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    </Box>
  );
}

export default SearchBar
