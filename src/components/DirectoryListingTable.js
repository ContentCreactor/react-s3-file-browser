import React from 'react';
import FileSize from './FileSize';
import NodeLink from './NodeLink';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import clsx from 'clsx'

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  specificCell: {
    padding: '0.2em'
  },

  container: {
    margin: '0.5em'
  },

  table: {
    borderCollapse: 'collapse',
    width: '100%'
  },

  head: {
    background: '#DDD',
    borderTop: '0.25em'
  },

  name: {
    padding: '0.5em'
  },

  lastModified: {
    width: '10em',
    padding: '0.5em'
  },

  size: {
    width: '10em',
    padding: '0.5em',
    textAlign: 'end'
  },

  row: {
    "&:hover": {
      background: '#FFD'
    }
  },

  cell: {
    padding: '0.2em'
  },

  cellLink: {
    "& a:visited": {
      color: 'blue'
    },
    "& a:hover": {
      textDecoration: 'underline'
    },
    "& a": {
      textDecoration: 'none'
    }
  },
});


const DirectoryListingTable = ({ items, changeSort }) => {

  const classes = useStyles();

  const rows = items.map(child => {
    return (
      <TableRow className={clsx(classes.row)}
        key={child.key}>
        <TableCell className={clsx(classes.specificCell, classes.cellLink)}>
          <NodeLink node={child}>{child.name}</NodeLink>
        </TableCell>
        <TableCell className={classes.specificCell}>
          {child.lastModified.toLocaleString()}
        </TableCell>
        <TableCell className={classes.specificCell}>
          <FileSize size={child.size} />
        </TableCell>
      </TableRow>
    );
  });

  return (
    <Box className={classes.container}>
      <Table className={classes.table}>
        <TableHead className={classes.head}>
          <TableRow>
            <TableCell className={classes.name}>
              <TableSortLabel 
              //</TableCell>onClick={() => changeSort('name')}
              >
                <span>Name</span>
              </TableSortLabel>
            </TableCell>

            <TableCell className={classes.lastModified}>
              <TableSortLabel 
              //</TableCell>onClick={() => changeSort('lastModified')}
              >
                <span>Last Modified</span>
              </TableSortLabel>
            </TableCell>

            <TableCell className={classes.size}>
              <TableSortLabel 
              //onClick={() => changeSort('size')}
              >
                <span>Size</span>
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    </Box >
  );
}

export default DirectoryListingTable
