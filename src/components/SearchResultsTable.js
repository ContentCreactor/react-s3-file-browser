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

const SearchResultsTable = ({ items }) => {
  const rows = items
    .map(child => {
      const { node, matchData } = child;

      return (
        <TableRow
          sx={[
            {
              '&:hover': {
                background: '#FFD'
              }
            }
          ]}
          key={node.key}>
          <TableCell sx={[
            {
              'a:visited': {
                color: 'blue'
              },
              'a:hover': {
                textDecoration: 'underline'
              },
              'a': {
                textDecoration: 'none'
              }
            },
            {
              padding: '0.2em',

            }]}>
            <NodeLink node={node}>
              <SearchResultTitle matchData={matchData} />
            </NodeLink>
          </TableCell>
          <TableCell sx={{
            padding: '0.2em'
          }}>
            {node.lastModified.toLocaleString()}        </TableCell>
          <TableCell sx={{
            padding: '0.2em'
          }}>
            <FileSize size={node.size} />
          </TableCell>
        </TableRow>
      );
    });

  return (
    <Box sx={{ margin: '0.5em' }}>
      <Table sx={{
        borderCollapse: 'collapse',
        width: '100%'
      }}>
        <TableHead
          sx={{
            background: '#DDD',
            borderTop: '0.25em'
          }}
        >
          <TableRow>
            <TableCell sx={{
              padding: '0.5em'
            }}>
              <span>Name</span>
            </TableCell>

            <TableCell sx={{
              width: '10em',
              padding: '0.5em'
            }}>
              <span>Last Modified</span>
            </TableCell>

            <TableCell sx={{
              width: '10em',
              padding: '0.5em',
              textAlign: 'end'
            }}>
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
