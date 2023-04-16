import { createUrlForEverything, createUrlForSearch } from 'helpers/createSearchUrl';
import { SearchCard } from 'interfaces';
import React, { useCallback, useEffect, useState } from 'react';
import { CardFromSearch } from './CardFromSearch';
import { useAppDispatch, useAppSelector } from 'store/hook';
import {
  changeValueOfSearch,
  requestApiAsync,
  statusAPI,
  valueAPI,
  valueSearch,
} from 'store/reduxSlice';

function SearchBox() {
  const searchDataStore = useAppSelector(valueSearch);
  const statusAPIStore = useAppSelector(statusAPI);
  const dataApiStore = useAppSelector(valueAPI);
  const [searchData, setSearchData] = useState(searchDataStore);
  const [isSubmit, setSubmit] = useState<boolean>(false);
  const [textError, setTextError] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const dataNews: Partial<SearchCard>[] = dataApiStore.articles;

  const defaultData = useCallback(async () => {
    if (!searchDataStore) {
      setTextError(false);
      try {
        const allDatas = await dispatch(
          requestApiAsync(
            searchDataStore ? createUrlForSearch(searchDataStore) : createUrlForEverything()
          )
        );
        if (allDatas.payload.status !== 'ok' || !allDatas.payload.articles.length) {
          setTextError(true);
          return;
        }
        setTextError(false);
      } catch {
        setTextError(true);
      }
    } else if (searchDataStore && !dataApiStore.articles.length && !isSubmit) {
      setTextError(true);
    }
  }, [dataApiStore.articles.length, dispatch, isSubmit, searchDataStore]);

  useEffect(() => {
    defaultData();
  }, [defaultData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmit(true);
    dispatch(changeValueOfSearch(searchData));
    setTextError(false);
    try {
      const allDatas = await dispatch(
        requestApiAsync(searchData ? createUrlForSearch(searchData) : createUrlForEverything())
      );
      if (allDatas.payload.status !== 'ok' || !allDatas.payload.articles.length) {
        setTextError(true);
        return;
      }
      setTextError(false);
    } catch {
      setTextError(true);
    }
    setSubmit(false);
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
        {statusAPIStore === 'loading' && <p data-testid="loading">Loading...</p>}
        {textError && <p data-testid="text-error">Some problems with API...or change request</p>}
      </div>
      <main className="block-cards" data-testid="api-card-block">
        {dataNews.map((cardSearch) => {
          return <CardFromSearch key={cardSearch.url} {...cardSearch}></CardFromSearch>;
        })}
      </main>
    </>
  );
}

export { SearchBox };
