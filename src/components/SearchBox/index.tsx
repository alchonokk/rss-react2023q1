import axios from 'axios';
import { createUrlForEverything, createUrlForSearch } from 'helpers/createSearchUrl';
import { SearchCard } from 'interfaces';
import React, { useEffect, useState } from 'react';
import { CardFromSearch } from './CardFromSearch';

function SearchBox() {
  const [searchData, setSearchData] = useState(localStorage.getItem('searchData') || '');
  const [APIData, setAPIData] = useState<Partial<SearchCard>[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [textError, setTextError] = useState<boolean>(false);

  useEffect(() => {
    const defaultSearchData = localStorage.getItem('searchData');
    try {
      axios
        .get(defaultSearchData ? createUrlForSearch(defaultSearchData) : createUrlForEverything())
        .then(async (resp) => {
          const allData = await resp.data;
          if (resp.status !== 200) {
            setLoading(false);
            setTextError(true);
            return;
          }
          setAPIData(allData.articles);
          setLoading(false);
          setTextError(false);
          if (!allData.articles.length) {
            setTextError(true);
          }
        })
        .catch(() => setTextError(true));
    } catch (error) {
      setTextError(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
    if (e.target.value === '') {
      localStorage.setItem('searchData', '');
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    localStorage.setItem('searchData', searchData);
    e.preventDefault();
    setLoading(true);
    setTextError(false);
    try {
      axios
        .get(searchData ? createUrlForSearch(searchData) : createUrlForEverything())
        .then(async (resp) => {
          const allData = await resp.data;
          if (resp.status !== 200) {
            setLoading(false);
            setTextError(true);
            return;
          }
          setAPIData(allData.articles);
          setLoading(false);
          setTextError(false);
          if (!allData.articles.length) {
            setTextError(true);
          }
        })
        .catch(() => setTextError(true));
    } catch (error) {
      setTextError(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} data-testid="input-submit">
        <input
          data-testid="input"
          type="search"
          className="search"
          placeholder="Search..."
          autoFocus
          onChange={handleChange}
          value={searchData}
        />
      </form>
      <div className="message">
        {isLoading && <p data-testid="loading">Loading...</p>}
        {textError && <p data-testid="text-error">Some problems with API...or change request</p>}
      </div>
      <main className="block-cards" data-testid="api-card-block">
        {APIData.map((cardSearch) => {
          return <CardFromSearch key={cardSearch.url} {...cardSearch}></CardFromSearch>;
        })}
      </main>
    </>
  );
}

export { SearchBox };
