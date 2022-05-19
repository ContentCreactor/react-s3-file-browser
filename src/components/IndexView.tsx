import React, { useState } from 'react';
import SearchBar from './SearchBar';
import DirectoryListingTable from './DirectoryListingTable';
import SearchResultsTable from './SearchResultsTable';
import PathNavigation from './PathNavigation';
import Box from '@mui/material/Box';
import { Node } from '../types'
import SortStore from 'src/stores/SortStore';

interface IndexViewInterface {
  node: Node
  sortStore: SortStore,
  searchFilter: (searchTerm: string, node: Node) => any,
  sortItems: (items: Node[], by: string, order: string) => () => any,
}

const IndexView: React.FC<IndexViewInterface> = ({
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
        changeSort={(newSortBy: any) => sortStore.changeSort(newSortBy)}
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
