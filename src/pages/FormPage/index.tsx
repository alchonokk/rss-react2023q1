import React from 'react';
import { FormState } from 'interfaces';
import { FormRender } from 'components/Form/FormRender';
import { CardForm } from 'components/Form/CardFromForm';

type FormProps = object;

class FormPage extends React.Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = {
      name: '',
      surName: '',
      date: '',
      city: '',
      male: undefined,
      female: undefined,
      file: '',
      fields: [],
    };
    this.updateData = this.updateData.bind(this);
  }

  updateData(
    name: string,
    surName: string,
    date: string,
    city: string,
    male: boolean,
    female: boolean,
    file: string
  ) {
    this.setState({
      name: name,
      surName: surName,
      date: date,
      city: city,
      male: male,
      female: female,
      file: file,
    });

    this.setState({
      fields: [...this.state.fields, { name, surName, date, city, male, female, file }],
    });
  }

  render() {
    return (
      <>
        <div data-testid="page-forms" className="block-forms">
          <FormRender updateData={this.updateData} />
        </div>
        <main className="block-cards">
          {this.state.fields.map((field) => {
            return <CardForm key={field.name} {...field}></CardForm>;
          })}
        </main>
      </>
    );
  }
}

export { FormPage };
