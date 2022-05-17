import React from 'react';
import NodeLink from './NodeLink';
import Box from '@mui/material/Box';

const PathNavigation = ({ node }) => {
  const parentLinks = [];
  let currentNode = node;

  do {
    parentLinks.unshift(<NodeLink node={currentNode} key={currentNode.key}>{currentNode.name}</NodeLink>);
    currentNode = currentNode.parent;
  } while (currentNode);


  return <Box sx={{ padding: '0.5em' }}>{parentLinks}</Box>;
}

export default PathNavigation 
