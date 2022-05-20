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

configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
});

const sortStore = new SortStore('name', 'asc');
const appStore = new AppStore();

async function loadData() {
  try {
    let bucketName, objectUrlBase, basePath, contents;

    console.log('using fake s3 data');
    bucketName = 'example-bucket';
    objectUrlBase = `https://${bucketName}.s3.amazonaws.com`;
    basePath = '/';
    const data = [
      { Key: 'foo1.file', Size: 1, LastModified: new Date('2000-01-01 00:00:00 +0000') },
      { Key: 'foo2/bar1.file', Size: 2, LastModified: new Date('2000-01-01 00:00:01 +0000') },
      { Key: 'foo2/bar2/baz1.file', Size: 3, LastModified: new Date('2000-01-01 00:00:02 +0000') },
      { Key: 'foo2/bar2/baz2.file', Size: 4, LastModified: new Date('2000-01-01 00:00:00 +0000') },
      { Key: 'foo2/bar3/baz3.file', Size: 5, LastModified: new Date('2000-01-01 00:00:01 +0000') },
    ];
    contents = await new Promise((resolve, reject) => setTimeout(() => resolve(data), 500));


    const treeBuilder = S3DirectoryListBuilder(bucketName, objectUrlBase);

    const { root, directories } = treeBuilder(contents);

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
