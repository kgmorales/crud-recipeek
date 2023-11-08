import { QueryClient } from '@tanstack/react-query';
import { localStoragePersister } from './queryClientPersistor';
import { persistQueryClient } from '@tanstack/react-query-persist-client';

const oneDayTime = 24 * 60 * 60 * 1000;

export const queryClient = new QueryClient({
  defaultOptions: { queries: { gcTime: oneDayTime } },
});

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
  maxAge: oneDayTime,
});
