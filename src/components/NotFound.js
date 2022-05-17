import React from 'react';
import PathNavigation from './PathNavigation';
import Box from '@mui/material/Box';
import styles from './NotFound.module.css'

const NotFound = ({ root, path }) => {
  return (
    <Box>
      <PathNavigation node={root} />
      <Box className={styles.container}>
        <Box className={styles.content}>
          <Box className={styles.text}>The specified path was not found:</Box>
          <Box>{path}</Box>
        </Box>
      </Box>
    </Box >
  );
}

export default NotFound