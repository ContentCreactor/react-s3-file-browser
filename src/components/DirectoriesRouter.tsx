import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import IndexView from './IndexView';
import NotFound from './NotFound';
import { Node } from '../types'
import SortStore from 'src/stores/SortStore';

interface DirectoriesRouterInterface {
  root: Node,
  directories: any,
  sortStore: SortStore,
  searchFilter: (searchTerm: string, node: Node) => any,
  sortItems:  (items: Node[], by: string, order: string) => () => any,
  basePath: string,
}

const DirectoriesRouter: React.FC<DirectoriesRouterInterface> = ({
  root,
  directories,
  sortStore,
  searchFilter,
  sortItems,
  basePath,
}) => {
  {

    const dirRoutes = directories.map((dir: any) => {
      const render = (props: any) =>
        <IndexView {...props}
          node={dir}
          sortStore={sortStore}
          searchFilter={searchFilter}
          sortItems={sortItems}
        />;
      return <Route exact key={dir.key} path={dir.path} render={render} />;
    })

    return (
      <Router basename={basePath}>
        <Switch>
          {dirRoutes}
          <Route path='*' render={({ location: { pathname } }) => <NotFound root={root} path={pathname} />} />
        </Switch>
      </Router>
    );
  }
}

export default DirectoriesRouter
