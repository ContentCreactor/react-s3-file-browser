import React from 'react';
import Box from '@mui/material/Box';
import styles from './FileSize.module.css';

const SIZE_SUFFIXES = ['B', 'KB', 'MB', 'GB', 'TB'];

const displaySize = function (size) {
  let i;

  for (i = 0; i < SIZE_SUFFIXES.length - 1; i++) {
    if (size < 1024) {
      return { size, suffix: SIZE_SUFFIXES[i] };
    }
    size /= 1024;
  }

  return { size, suffix: SIZE_SUFFIXES[i] };
}

const FileSize = ({ size: propsSize }) => {
  const { size, suffix } = displaySize(propsSize);

  return (
    <Box className={styles.fileSize}>
      <span>{Math.round(size)}</span>
      <span className={styles.suffix}>{suffix}</span>
    </Box>
  );
}

export default FileSize
