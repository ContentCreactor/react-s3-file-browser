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

const DirectoryListingTable = ({ items, changeSort }) => {
  const rows = items.map(child => {
    return (
      <TableRow
        sx={[
          {
            '&:hover': {
              background: '#FFD'
            }
          }
        ]}
        key={child.key}>
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
          <NodeLink node={child}>{child.name}</NodeLink>
        </TableCell>
        <TableCell sx={{
          padding: '0.2em'
        }}>
          {child.lastModified.toLocaleString()}
        </TableCell>
        <TableCell sx={{
          padding: '0.2em'
        }}>
          <FileSize size={child.size} />
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
              <TableSortLabel onClick={() => changeSort('name')}>
                <span>Name</span>
              </TableSortLabel>
            </TableCell>

            <TableCell sx={{
              width: '10em',
              padding: '0.5em'
            }}>
              <TableSortLabel onClick={() => changeSort('lastModified')}>
                <span>Last Modified</span>
              </TableSortLabel>
            </TableCell>

            <TableCell sx={{
              width: '10em',
              padding: '0.5em',
              textAlign: 'end'
            }}>
              <TableSortLabel onClick={() => changeSort('size')}>
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
