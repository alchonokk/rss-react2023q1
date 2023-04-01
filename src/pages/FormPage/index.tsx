import React, { useState } from 'react';
import { FormDataNew } from 'interfaces';
import { FormRender } from 'components/Form/FormRender';
import { CardForm } from 'components/Form/CardFromForm';

function FormPage() {
  const [formValues, setFormValues] = useState<FormDataNew[]>([]);
  return (
    <>
      <div data-testid="page-forms" className="block-forms">
        <FormRender setFormValues={setFormValues} />
      </div>
      <main className="block-cards">
        {formValues.map((field) => {
          return <CardForm key={field.name} {...field}></CardForm>;
        })}
      </main>
    </>
  );
}

export { FormPage };
