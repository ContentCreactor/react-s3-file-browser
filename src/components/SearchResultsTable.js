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
import styles from './SearchResultsTable.module.css';
import clsx from 'clsx';

const SearchResultsTable = ({ items }) => {
  const rows = items.map(child => {
    const { node, matchData } = child;

    return (
      <TableRow className={styles.row} key={node.key}>
        <TableCell className={clsx(styles.cell, styles.cellLink)}>
          <NodeLink node={node}>
            <SearchResultTitle matchData={matchData} />
          </NodeLink>
        </TableCell>

        <TableCell className={styles.cell}>
          {node.lastModified.toLocaleString()}
        </TableCell>

        <TableCell className={styles.cell}>
          <FileSize size={node.size} />
        </TableCell>
      </TableRow>
    );
  });

  return (
    <Box className={styles.container}>
      <Table className={styles.table}>
        <TableHead className={styles.head}>
          <TableRow>
            <TableCell className={styles.name}>
              <span>Name</span>
            </TableCell>

            <TableCell className={styles.lastModified}>
              <span>Last Modified</span>
            </TableCell>

            <TableCell className={styles.size}>
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
