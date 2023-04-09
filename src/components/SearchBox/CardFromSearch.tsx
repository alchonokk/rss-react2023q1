import { SearchCard } from 'interfaces';
import './style.css';
import React from 'react';
import useModal from 'components/Modal/useModal';
import Modal from 'components/Modal/Modal';

function CardFromSearch(cardData: Partial<SearchCard>) {
  const { isShowing, toggle } = useModal();

  const imageOnErrorHandler = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = 'https://imgholder.ru/323x300/9dbf16/fff&text=image';
  };

  return (
    <>
      <Modal isShowing={isShowing} hide={toggle} cardData={cardData} />
      <div className="card-search" data-testid="api-card" onClick={toggle}>
        {cardData.urlToImage ? (
          <img
            className="image-card"
            data-testid="cardImage"
            src={cardData.urlToImage}
            alt="img picture"
            onError={imageOnErrorHandler}
          />
        ) : (
          <span className="image-card holder" data-testid="withoutCardImage"></span>
        )}
        <h3 data-testid="title">{cardData.title}</h3>
        <p data-testid="date-card-search">Date: {cardData.publishedAt}</p>
      </div>
    </>
  );
}

export { CardFromSearch };
