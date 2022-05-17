import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import DirectoriesRouter from './DirectoriesRouter';
import Box from '@mui/material/Box';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import { keyframes } from '@emotion/react'

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

const loading = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
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
      return <Box
        sx={[
          {
            '&::after': {
              content: '"/"',
              display: 'block',
              width: '8em',
              height: '8em',
              margin: 'auto',
              borderRadius: '50%',
              border: '1.5em solid #000',
              borderColor: '#000 transparent #000 transparent',
              animation: `${loading} 1.2s linear infinite`,
            }
          },
          {
            width: '100%',
            height: '100%'
          }]}
      >{appStore.error}</Box>;
    } else if (appStore.isError) {
      return <Box
        sx={[
          {
            '&::before': {
              content: '"⚠"',
              fontSize: '2em',
              color: '#f00',
              fontWeight: 'bold',
            }
          },
          {
            margin: '0.5em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25em',
            fontWeight: 'bold',
          }]}
      >{appStore.error}</Box>;
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
