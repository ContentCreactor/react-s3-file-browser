import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import DirectoriesRouter from './DirectoriesRouter';
import '../App.css';


import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});


export default @observer class App extends Component {
  static propTypes = {
    sortStore: PropTypes.object,
    appStore: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
      isLoaded: PropTypes.bool.isRequired,
      isError: PropTypes.bool.isRequired,
      error: PropTypes.string,
      root: PropTypes.object,
      directories: PropTypes.array,
    }).isRequired,
    searchFilter: PropTypes.func,
    sortItems: PropTypes.func,
  }

  render() {
    const {
      sortStore,
      appStore,
      searchFilter,
      sortItems,
    } = this.props;

    if (appStore.isLoading) {
      return <div className="loading" />;
    } else if (appStore.isError) {
      return <div className="error">{appStore.error}</div>;
    } else if (appStore.isLoaded) {
      return (
        <ThemeProvider theme={theme}>
          <DirectoriesRouter
            sortStore={sortStore}
            root={appStore.root}
            directories={appStore.directories}
            searchFilter={searchFilter}
            sortItems={sortItems}
            basePath={appStore.basePath}
          />
        </ThemeProvider>

      );
    } else {
      throw new Error('unreachable state');
    }
  }
}
