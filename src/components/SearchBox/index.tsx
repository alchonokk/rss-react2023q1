import React, { useEffect, useState } from 'react';

function SearchBox() {
  const [searchData, setSearchData] = useState(localStorage.getItem('searchData') || '');

  useEffect(() => {
    localStorage.setItem('searchData', searchData);
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
