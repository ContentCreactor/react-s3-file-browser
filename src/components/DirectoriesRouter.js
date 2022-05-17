import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import IndexView from './IndexView';
import NotFound from './NotFound';

export default class DirectoriesRouter extends Component {
  static propTypes = {
    root: PropTypes.object,
    directories: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    sortStore: PropTypes.object,
    searchFilter: PropTypes.func,
    sortItems: PropTypes.func,
    basePath: PropTypes.string,
  }

  render() {
    const {
      root,
      directories,
      sortStore,
      searchFilter,
      sortItems,
      basePath,
    } = this.props;

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
