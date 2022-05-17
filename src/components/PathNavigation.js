import React from 'react';
import NodeLink from './NodeLink';
import Box from '@mui/material/Box';
import styles from './PathNavigation.module.css'

const PathNavigation = ({ node }) => {
  const parentLinks = [];
  let currentNode = node;

  do {
    parentLinks.unshift(<NodeLink node={currentNode} key={currentNode.key}>{currentNode.name}</NodeLink>);
    currentNode = currentNode.parent;
  } while (currentNode);


  return <Box className={styles.link}>{parentLinks}</Box>;
}

export default PathNavigation 
