import { IValueToModal } from 'interfaces';
import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({
  isShowing,
  hide,
  cardData: { title, content, url, publishedAt, source, author, description },
}: IValueToModal) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="full-screen" onClick={hide}>
            <div
              className="modal"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div>
                <button className="button-close" onClick={hide} data-testid="close-modal">
                  X
                </button>
              </div>
              <div>
                <h3>{title}</h3>
                <h5>Description: {description}</h5>
                <p>
                  Content: {content}{' '}
                  <a href={url} target="blank" data-testid="link-news">
                    Read more...
                  </a>
                </p>
                <h6>Date: {publishedAt}</h6>
                <h6>Author: {author}</h6>
                <h6>Publishing house: {source?.name}</h6>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

export default Modal;
