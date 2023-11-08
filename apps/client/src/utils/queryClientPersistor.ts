import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

// Define the persister as a function that returns the created persister or null
export function createLocalStoragePersister() {
  if (typeof window !== 'undefined') {
    return createSyncStoragePersister({
      storage: window.localStorage,
    });
  }
  return null;
}
