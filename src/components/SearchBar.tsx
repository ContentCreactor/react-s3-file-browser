import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import styles from './SearchBar.module.css';

interface SearchResultsTableInterface {
  searchTerm: string,
  nodeName: string
  onChange: (value: string) => void
}

const SearchBar: React.FC<SearchResultsTableInterface> = ({
  searchTerm,
  nodeName,
  onChange,
}) => {
  const placeholder = nodeName ? `Search in ${nodeName}` : 'Search';

  return (
    <Box className={styles.container}>
      <TextField
        className={styles.input}
        id="outlined-basic"
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    </Box>
  );
}

export default SearchBar
