import { useQuery } from '@tanstack/react-query';
import fetchSpotify from '@api/social/now-playing.routes';

export const useSpotify = () => {
  const spotifyQuery = useQuery({
    queryKey: ['spotify'],
    queryFn: fetchSpotify,
  });

  return { spotify: spotifyQuery.data };
};

export default useSpotify;
