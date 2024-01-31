import { useQuery } from '@tanstack/react-query';
import fetchInstagram from '@api/social/instagram.routes';

export const useInstagram = () => {
  const instagramQuery = useQuery({
    queryKey: ['instagram'],
    queryFn: fetchInstagram,
  });

  return { instafeed: instagramQuery.data };
};

export default useInstagram;
