import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import SearchBar from './SearchBar';
import DirectoryListingTable from './DirectoryListingTable';
import SearchResultsTable from './SearchResultsTable';
import PathNavigation from './PathNavigation';
import Box from '@mui/material/Box';

export default @observer class IndexView extends Component {
  static propTypes = {
    node: PropTypes.shape({
      children: PropTypes.array.isRequired,
      parent: PropTypes.object,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }

  constructor() {
    super(...arguments);
    this.state = {
      searchTerm: '',
    };
  }

  render() {
    const {
      node,
      sortStore,
      searchFilter,
      sortItems,
    } = this.props;
    const { searchTerm } = this.state;

    let table;
    if (searchTerm === '') {
      table = (
        <DirectoryListingTable
          items={sortItems(node.children, sortStore.sortBy, sortStore.sortOrder)}
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
          onChange={term => this.changeSearchTerm(term)}
          nodeName={searchNodeName}
        />
        {table}
      </Box>
    );
  }

  changeSearchTerm(term) {
    this.setState({ searchTerm: term });
  }
}
