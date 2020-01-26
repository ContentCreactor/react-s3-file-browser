import DirectoriesStore from './DirectoriesStore';

describe(DirectoriesStore, () => {
  it('initializes in the loading state', () => {
    const directoriesStore = new DirectoriesStore();
    expect(directoriesStore.hasDirectories).toBe(false);
    expect(directoriesStore.directories).toBeNull();
    expect(directoriesStore.error).toBe(false);
  });

  it('records when an error happens', () => {
    const directoriesStore = new DirectoriesStore();
    directoriesStore.onError();
    expect(directoriesStore.hasDirectories).toBe(false);
    expect(directoriesStore.directories).toBeNull();
    expect(directoriesStore.error).toBe(true);
  });

  it('records when an error happens', () => {
    const directoriesStore = new DirectoriesStore();
    directoriesStore.setDirectories(['one', 'two']);
    expect(directoriesStore.hasDirectories).toBe(true);
    expect(directoriesStore.directories).toEqual(['one', 'two']);
    expect(directoriesStore.error).toBe(false);
  });
});