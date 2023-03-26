import { FormData } from 'interfaces';
import React from 'react';

class CardForm extends React.Component<FormData> {
  constructor(props: FormData) {
    super(props);
  }
  render() {
    return (
      <div className="card" data-testid="form-card">
        <img data-testid="cardImage" src={this.props.file} alt="img picture" />
        <h3>{this.props.name}</h3>
        <h3>{this.props.surName}</h3>
        {this.props.switcher ? (
          <p data-testid="gender">female</p>
        ) : (
          <p data-testid="gender">male</p>
        )}
        <p>Дата: {this.props.date}</p>
        <h4>{this.props.city}</h4>
      </div>
    );
  }
}

export { CardForm };
