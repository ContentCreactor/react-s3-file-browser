import React, { useState } from 'react';
import SearchBar from './SearchBar';
import DirectoryListingTable from './DirectoryListingTable';
import SearchResultsTable from './SearchResultsTable';
import PathNavigation from './PathNavigation';
import Box from '@mui/material/Box';


const IndexView = ({
  node,
  sortStore,
  searchFilter,
  sortItems,
}) => {

  const [searchTerm, setsearchTerm] = useState('')

  let table;
  if (searchTerm === '') {
    table = (
      <DirectoryListingTable
        node={node}
        sortStore={sortStore}
        sortItems={sortItems}
        changeSort={newSortBy => sortStore.changeSort(newSortBy)}
      />
    );
  } else {
    table = <SearchResultsTable items={searchFilter(searchTerm, node)} />;
  }

  const searchNodeName = node.parent ? node.name : null;

  return (
    <Box>
      <PathNavigation node={node} />
      <SearchBar
        searchTerm={searchTerm}
        onChange={term => setsearchTerm(term)}
        nodeName={searchNodeName}
      />
      {table}
    </Box>
  );
}

export default IndexView