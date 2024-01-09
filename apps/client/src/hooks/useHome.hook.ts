// import { useQuery } from '@tanstack/react-query';
// import { fetchHome } from '@api/pages/home.routes';
// import { addCategoryToRecipe } from '@clientUtils/addCategoryToRecipe';
// import { useEffect, useState } from 'react';
// import { Home } from '../types/pages/home.types';

// export const useHome = () => {
//   const [isHomeLoaded, setIsHomeLoaded] = useState(false);

//   const homeQuery = useQuery({
//     queryKey: ['home'],
//     queryFn: fetchHome,
//     select: (data: Home) => {
//       const { categories, favorites, recents } = data;
//       return {
//         categories,
//         favorites: addCategoryToRecipe(favorites, categories),
//         recents: addCategoryToRecipe(recents, categories),
//       };
//     },
//   });

//   useEffect(() => {
//     if (homeQuery.status === 'success') {
//       setIsHomeLoaded(true); // Set the flag when home data is successfully fetched
//     }
//   }, [homeQuery.status]);

//   return {
//     ...homeQuery,
//     home: homeQuery.data,
//     isHomeLoaded: isHomeLoaded,
//   };
// };

// export default useHome;
