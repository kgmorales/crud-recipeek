// components/Search.tsx

import { debounce } from '@utils/debounce';
import React, { useState, useEffect } from 'react';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Debounce the search function
  const debouncedSearch = debounce((query) => {
    if (query) {
      fetch(`/api/search?query=${query}`)
        .then((response) => response.json())
        .then((data) => setResults(data));
    } else {
      setResults([]);
    }
  }, 300); // 300ms delay

  useEffect(() => {
    debouncedSearch(query);
    // Cancel the debounce on useEffect cleanup.
    return debouncedSearch.cancel;
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for recipes..."
      />
      <div>
        {results.map((result) => (
          <div key={result.id}>{result.name}</div>
        ))}
      </div>
    </div>
  );
}

export default Search;
