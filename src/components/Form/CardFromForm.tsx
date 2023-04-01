import React from 'react';
import { FormDataNew } from 'interfaces';

function CardForm({ name, surName, date, city, gender, filePicture }: FormDataNew) {
  return (
    <div className="card card-form" data-testid="form-card">
      <img data-testid="cardImage" src={filePicture} alt="img picture" />
      <h5 className="card-detail">Name: {name}</h5>
      <h5 className="card-detail">SurName: {surName}</h5>
      <p data-testid="gender-female" className="card-detail">
        Gender: {gender}
      </p>
      <p className="card-detail">Date: {date}</p>
      <h5 className="card-detail">City: {city}</h5>
    </div>
  );
}

export { CardForm };
