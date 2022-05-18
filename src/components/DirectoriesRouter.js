import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import IndexView from './IndexView';
import NotFound from './NotFound';


const DirectoriesRouter = ({
  root,
  directories,
  sortStore,
  searchFilter,
  sortItems,
  basePath,
}) => {
  {

    const dirRoutes = directories.map(dir => {
      const render = props =>
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
