import { QueryClient } from '@tanstack/react-query';
import { createLocalStoragePersister } from './queryClientPersistor';
import { persistQueryClient } from '@tanstack/react-query-persist-client';

const oneDayTime = 24 * 60 * 60 * 1000;
const localStoragePersister = createLocalStoragePersister();

export const queryClient = new QueryClient({
  defaultOptions: { queries: { gcTime: oneDayTime } },
});

//* Only call persistQueryClient if localStoragePersister is NOT null
if (localStoragePersister) {
  persistQueryClient({
    queryClient,
    persister: localStoragePersister,
    maxAge: oneDayTime,
  });
}
