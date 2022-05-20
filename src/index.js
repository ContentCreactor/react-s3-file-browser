import { configure } from 'mobx';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as s3ConfigDeterminator from './services/s3ConfigDeterminator';
import S3DirectoryListBuilder from './services/S3DirectoryListBuilder';
import AppStore from './stores/AppStore';
import SortStore from './stores/SortStore';
import searchFilter from './services/searchFilter';
import sortItems from './services/sortItems';
import axios from 'axios';
import { API_URL } from './config';

configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
});

const sortStore = new SortStore('name', 'asc');
const appStore = new AppStore();

const loadData = async () => {
  try {
    let bucketName, objectUrlBase, basePath, contents;

    console.log('using fake s3 data');
    bucketName = 'example-bucket';
    objectUrlBase = `https://${bucketName}.s3.amazonaws.com`;
    basePath = '/';

    const response = await axios.get(API_URL)

    console.log('got data from api', response.data)

    const treeBuilder = S3DirectoryListBuilder(bucketName, objectUrlBase);

    const { root, directories } = treeBuilder(response.data);

    appStore.onLoaded({ root, directories, basePath });
  } catch (error) {
    console.error(error);
    if (error instanceof s3ConfigDeterminator.CannotDetermineBucket) {
      appStore.onError(error.message);
    } else {
      appStore.onError('Error loading data');
    }
  }
}


loadData();

ReactDOM.render(
  <App
    sortStore={sortStore}
    appStore={appStore}
    searchFilter={searchFilter}
    sortItems={sortItems}
  />,
  document.getElementById('root')
);
