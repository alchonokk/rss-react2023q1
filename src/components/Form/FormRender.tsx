import React, { Dispatch, SetStateAction } from 'react';
import './style.css';
import { FormDataNew } from 'interfaces';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form/dist/types';
import { nameRegExp, validateDate } from 'helpers/validationForm';

function isSubmitDisabled(isDirty: boolean, errors: FieldErrors<FieldValues>): boolean {
  return !isDirty || !(Object.keys(errors).length == 0);
}

const FormRender = ({
  setFormValues,
}: {
  setFormValues: Dispatch<SetStateAction<FormDataNew[]>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({ mode: 'onSubmit', reValidateMode: 'onChange', shouldFocusError: true });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { name, surName, date, city, gender, file } = data;
    if (file) {
      const filePicture = URL.createObjectURL(file[0]);
      setFormValues((state: FormDataNew[]) => [
        ...state,
        { name, surName, date, city, gender, filePicture },
      ]);
    }
    reset();
  };

  return (
    <section data-testid="form" className="section-form">
      <h1>Complete Forms</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <p className="label-name-item">Name:</p>
        <input data-testid="input-name" {...register('name', nameRegExp())} />
        {errors.name && (
          <p className="error" data-testid="input-name-error">
            Name must be longer than 3 letters
          </p>
        )}
        <p className="label-name-item">Surname:</p>
        <input data-testid="input-surname" {...register('surName', nameRegExp())} />
        {errors.surName && (
          <p className="error" data-testid="input-surname-error">
            SurName must be longer than 3 letters
          </p>
        )}
        <p className="label-name-item">Current date:</p>
        <input
          type="date"
          data-testid="input-date"
          {...register('date', {
            validate: (value: Partial<string>) => {
              return validateDate(value);
            },
          })}
        />
        {errors.date && (
          <p className="error" data-testid="input-date-error">
            Check date (you should select date of current month)
          </p>
        )}
        <p className="label-name-item">Pick your city:</p>
        <select defaultValue="" {...register('city', { required: true })}>
          <option value="" disabled>
            Choose city...
          </option>
          <option value="brest">Brest</option>
          <option value="minsk">Minsk</option>
          <option value="grodno">Grodno</option>
        </select>
        {errors.city && <p className="error">Choose city</p>}
        <div className="wraper-switch">
          <label>
            <input
              type="radio"
              value="male"
              {...register('gender', {
                required: {
                  value: true,
                  message: 'Choose your gender',
                },
              })}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              value="female"
              {...register('gender', {
                required: {
                  value: true,
                  message: 'Choose your gender',
                },
              })}
            />
            Female
          </label>
        </div>
        {errors.gender && <p className="error">Choose your gender</p>}
        <p>I agree to data processing:</p>
        <input
          type="checkbox"
          className="input-agree"
          {...register('isAgree', {
            required: {
              value: true,
              message: 'You must be agree',
            },
          })}
        />
        {errors.isAgree && <p className="error">You must be agree</p>}
        <p>Upload file :</p>
        <input type="file" {...register('file', { required: true })} />
        {errors.file && <p className="error">You must add file</p>}
        <input
          type="submit"
          value="Send"
          className="button-submit"
          disabled={isSubmitDisabled(isDirty, errors)}
          data-testid="submit"
        />
      </form>
    </section>
  );
};

export { FormRender };
