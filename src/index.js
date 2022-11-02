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



    //  const asd =  browser.cookies.getAll()

    //   console.log('gookie is', asd)



    let bucketName, objectUrlBase, basePath, contents;

    console.log('using fake s3 data');
    bucketName = 'example-bucket';
    objectUrlBase = `https://${bucketName}.s3.amazonaws.com`;
    basePath = '/';

   // const response = await axios.get('http://localhost:8080/', { withCredentials: true })

    const response = {
      data: [
        { Key: 'foo1.file', Size: 1, LastModified: new Date('2000-01-01 00:00:00 +0000') },
        { Key: 'foo2/bar1.file', Size: 2, LastModified: new Date('2000-01-01 00:00:01 +0000') },
        { Key: 'foo2/bar2/baz1.file', Size: 3, LastModified: new Date('2000-01-01 00:00:02 +0000') },
        { Key: 'foo2/bar2/baz2.file', Size: 4, LastModified: new Date('2000-01-01 00:00:00 +0000') },
        { Key: 'foo2/bar3/baz3.file', Size: 5, LastModified: new Date('2000-01-01 00:00:01 +0000') },
      ]
    };



    console.log('got data from api', response.data)

    const treeBuilder = S3DirectoryListBuilder(bucketName, objectUrlBase);

    const { root, directories } = treeBuilder(response.data);

    appStore.onLoaded({ root, directories, basePath });

    // try {
    //   const aute = await axios.get(`${API_URL}/auth`, { withCredentials: true })
    //   return aute.data.username

    // } catch (e) {
    //   return ''
    // }
  } catch (error) {
    console.error(error);
    if (error instanceof s3ConfigDeterminator.CannotDetermineBucket) {
      appStore.onError(error.message);
    } else {
      appStore.onError('Error loading data');
    }
  }
}


const user = loadData().then(res => {
  ReactDOM.render(
    <App
      sortStore={sortStore}
      appStore={appStore}
      searchFilter={searchFilter}
      sortItems={sortItems}
      user={res}
    />,
    document.getElementById('root')
  );

});

