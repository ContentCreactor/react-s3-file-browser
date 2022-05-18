import { action, observable, makeObservable, runInAction } from 'mobx';

export default class SortStore {
  @observable sortBy = null;
  @observable sortOrder = 'desc';

  constructor(defaultSortBy, defaultSortOrder) {
    makeObservable(this);
    runInAction(() => {
      this.sortBy = defaultSortBy;
      this.defaultSortOrder = defaultSortOrder;
      this.sortOrder = defaultSortOrder;         // <====== We dont have to define an action
    });
  }

  @action changeSort(sortBy) {
    if (this.sortBy === sortBy) {
      this.sortOrder = (this.sortOrder === 'asc') ? 'desc' : 'asc';
    } else {
      this.sortOrder = this.defaultSortOrder;
    }
    this.sortBy = sortBy;
  }
}
