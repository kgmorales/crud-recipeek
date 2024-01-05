import React, { useState, useCallback, useEffect } from 'react';
import debounce from '@clientUtils/debounce'; // Adjust the import path to where your debounce utility is located
import styles from './Search.module.scss';
import { useSearchContext } from '@contexts';
import { useSearch } from '@hooks';
import { useRouter } from 'next/router';

const Search = () => {
  const { searchTerm, setSearchTerm } = useSearchContext();
  const [value, setValue] = useState(''); // This state will keep the input value
  const router = useRouter();

  // Debounce setSearchTerm function
  const debouncedSetSearchTerm = useCallback(
    debounce((newTerm: string) => {
      setSearchTerm(newTerm);
      window.scrollTo(0, 0);
    }, 800),
    [],
  );

  useSearch(searchTerm);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update value state as user types
    setValue(event.target.value);
    // Call the debounced function with the new value
    debouncedSetSearchTerm(event.target.value);
  };

  useEffect(() => {
    setSearchTerm('');
    setValue('');
  }, [router.asPath, setSearchTerm]);

  return (
    <>
      <div className={`${styles.search}`}>
        <input
          className={`${styles.search__input} color-gray-300`}
          type="search"
          id="searchInput"
          placeholder="Search recipes..."
          onChange={handleSearchChange}
          value={value}
        />

        <div className={`${styles.search__iconContainer} color-gray-300`}>
          <label
            htmlFor="searchInput"
            className={`${styles.search__label}`}
            aria-label="Search"
          >
            <svg viewBox="0 0 1000 1000">
              <path
                fill="currentColor"
                d="M408 745a337 337 0 1 0 0-674 337 337 0 0 0 0 674zm239-19a396 396 0 0 1-239 80 398 398 0 1 1 319-159l247 248a56 56 0 0 1 0 79 56 56 0 0 1-79 0L647 726z"
              />
            </svg>
          </label>
        </div>
      </div>
    </>
  );
};

export default Search;
