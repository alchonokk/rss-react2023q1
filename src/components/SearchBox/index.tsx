import React, { useEffect, useState } from 'react';

function SearchBox() {
  const [searchData, setSearchData] = useState(() => {
    const searchDataFromLocalStor = localStorage.getItem('searchData');
    if (searchDataFromLocalStor) {
      return searchDataFromLocalStor;
    }
    return '';
  });

  useEffect(() => {
    return () => {
      localStorage.setItem('searchData', searchData);
    };
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
  };

  return (
    <input
      data-testid="input"
      type="search"
      className="search"
      placeholder="Search..."
      autoFocus
      onChange={handleChange}
      value={searchData}
    />
  );
}

export { SearchBox };
