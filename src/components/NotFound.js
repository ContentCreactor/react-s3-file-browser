import React from 'react';
import PathNavigation from './PathNavigation';
import Box from '@mui/material/Box';

const NotFound = ({ root, path }) => {
  return (
    <Box>
      <PathNavigation node={root} />
      <Box
        sx={[{
          '&::before': {
            content: '"⚠"',
            fontSize: '2em',
            color: '#f00',
            fontWeight: 'bold',
          }
        },
        {
          margin: '0.5em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }]}
      >
        <Box
          sx={{
            display: 'inline-block',
            margin: '0.5em'
          }}
        >
          <Box
            sx={{
              fontSize: '1.25em',
              fontWeight: 'bold'
            }}
          >The specified path was not found:</Box>
          <Box>{path}</Box>
        </Box>
      </Box>
    </Box >
  );
}

export default NotFound