import React from 'react';
import FileSize from './FileSize';
import NodeLink from './NodeLink';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

const DirectoryListingTable = ({ items, changeSort }) => {
  const rows = items.map(child => {
    return (
      <TableRow key={child.key}>
        <TableCell><NodeLink node={child}>{child.name}</NodeLink></TableCell>
        <TableCell>{child.lastModified.toLocaleString()}</TableCell>
        <TableCell><FileSize size={child.size} /></TableCell>
      </TableRow>
    );
  });

  return (
    <div className='objects-table'>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '10em' }}>
              <TableSortLabel onClick={() => changeSort('name')}>
                <span>Name</span>
              </TableSortLabel>
            </TableCell>

            <TableCell sx={{ width: '10em' }}>
              <TableSortLabel onClick={() => changeSort('lastModified')}>
                <span>Last Modified</span>
              </TableSortLabel>
            </TableCell>

            <TableCell sx={{ width: '10em' }}>
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
    </div>
  );
}

export default DirectoryListingTable
