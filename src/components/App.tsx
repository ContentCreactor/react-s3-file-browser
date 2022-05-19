import React from 'react';
import { observer } from 'mobx-react';
import DirectoriesRouter from './DirectoriesRouter';
import Box from '@mui/material/Box';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import styles from './App.module.css';
import AppStore from 'src/stores/AppStore';
import SortStore from 'src/stores/SortStore';

import {Node} from '../types'

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

interface AppInterface {
  sortStore: SortStore,
  appStore: AppStore,
  searchFilter: (searchTerm: string, node: Node) => Node[],
  sortItems: (items: Node[], by: string, order: string) => () => any,
}

const App: React.FC<AppInterface> = observer(({
  sortStore,
  appStore,
  searchFilter,
  sortItems,
}) => {
  if (appStore.isLoading) {
    return <Box className={styles.loading} />;
  } else if (appStore.isError) {
    return <Box className={styles.error}>
      {appStore.error}
    </Box>;
  } else if (appStore.isLoaded) {
    return (
      <ThemeProvider theme={theme}>
        <DirectoriesRouter
          sortStore={sortStore}
          root={appStore.root as any}
          directories={appStore.directories}
          searchFilter={searchFilter}
          sortItems={sortItems}
          basePath={appStore.basePath ?? ''}
        />
      </ThemeProvider>
    );
  } else {
    throw new Error('unreachable state');
  }
})

export default App
