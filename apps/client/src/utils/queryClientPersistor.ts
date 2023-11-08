import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

// Check if window is defined before using it
const localStoragePersister =
  typeof window !== 'undefined'
    ? createSyncStoragePersister({
        storage: window.localStorage,
      })
    : null;

export { localStoragePersister };
