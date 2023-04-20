import React from 'react';
import { FormRender } from 'components/Form/FormRender';
import { CardForm } from 'components/Form/CardFromForm';
import { useAppSelector } from 'store/hook';
import { informationFromForm } from 'store/reduxSlice';

function FormPage() {
  const dataFromForm = useAppSelector(informationFromForm);
  return (
    <>
      <div data-testid="page-forms" className="block-forms">
        <FormRender />
      </div>
      <main className="block-cards">
        {dataFromForm.map((field) => {
          return <CardForm key={field.name} {...field}></CardForm>;
        })}
      </main>
    </>
  );
}

export { FormPage };
