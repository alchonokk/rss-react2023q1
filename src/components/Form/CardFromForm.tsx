import { FormData } from 'interfaces';
import React from 'react';

class CardForm extends React.Component<FormData> {
  constructor(props: FormData) {
    super(props);
  }
  render() {
    return (
      <div className="card card-form" data-testid="form-card">
        <img data-testid="cardImage" src={this.props.file} alt="img picture" />
        <h5 className="card-detail">Name: {this.props.name}</h5>
        <h5 className="card-detail">SurName: {this.props.surName}</h5>
        {this.props.female ? (
          <p data-testid="gender" className="card-detail">
            Gender: female
          </p>
        ) : (
          <p className="card-detail" data-testid="gender">
            Gender: male
          </p>
        )}
        <p className="card-detail">Date: {this.props.date}</p>
        <h5 className="card-detail">City: {this.props.city}</h5>
      </div>
    );
  }
}

export { CardForm };
