import React from 'react';
import FileSize from './FileSize';
import NodeLink from './NodeLink';
import SearchResultTitle from './SearchResultTitle';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import clsx from 'clsx';
import {Node} from '../types'

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

interface SearchResultsTableInterface {
  items: {
    node: Node,
    matchData: { match: boolean, fragment: string }[][]
  }[]
}

const SearchResultsTable: React.FC<SearchResultsTableInterface> = ({ items }) => {
  const classes = useStyles();

  const rows = items.map(child => {
    const { node, matchData } = child;

    return (
      <TableRow className={classes.row} key={node.key}>
        <TableCell className={clsx(classes.specificCell, classes.cellLink)}>
          <NodeLink node={node}>
            <SearchResultTitle matchData={matchData} />
          </NodeLink>
        </TableCell>

        <TableCell className={classes.specificCell}>
          {node.lastModified.toLocaleString()}
        </TableCell>

        <TableCell className={classes.specificCell}>
          <FileSize size={node.size} />
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
              <span>Name</span>
            </TableCell>

            <TableCell className={classes.lastModified}>
              <span>Last Modified</span>
            </TableCell>

            <TableCell className={classes.size}>
              <span>Size</span>
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

export default SearchResultsTable
