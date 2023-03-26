import React from 'react';
import './style.css';
import { FormProps } from 'interfaces';

type FormState = {
  errors: string[];
  isDisabled: boolean;
  isFirst: boolean;
  isSubmited: boolean;
  isShowMessage: boolean;
};

class FormRender extends React.Component<FormProps, FormState> {
  nameInput: React.RefObject<HTMLInputElement>;
  surNameInput: React.RefObject<HTMLInputElement>;
  dateInput: React.RefObject<HTMLInputElement>;
  citySelect: React.RefObject<HTMLSelectElement>;
  switcherInput: React.RefObject<HTMLInputElement>;
  maleInput: React.RefObject<HTMLInputElement>;
  femaleInput: React.RefObject<HTMLInputElement>;
  agreeInput: React.RefObject<HTMLInputElement>;
  fileInput: React.RefObject<HTMLInputElement>;
  form: React.RefObject<HTMLFormElement>;

  constructor(props: FormProps) {
    super(props);
    this.state = {
      errors: [],
      isDisabled: true,
      isFirst: true,
      isSubmited: false,
      isShowMessage: false,
    };
    this.nameInput = React.createRef();
    this.surNameInput = React.createRef();
    this.dateInput = React.createRef();
    this.citySelect = React.createRef();
    this.switcherInput = React.createRef();
    this.maleInput = React.createRef();
    this.femaleInput = React.createRef();
    this.agreeInput = React.createRef();
    this.fileInput = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.form = React.createRef();
    this.firstInput = this.firstInput.bind(this);
    this.showMess = this.showMess.bind(this);
  }

  firstInput = async () => {
    if (this.state.isFirst === true) {
      this.setState({ isDisabled: false });
      this.setState({ isFirst: false });
    } else {
      if (this.state.isSubmited) {
        await this.validate();
      }
    }
  };

  showMess = async () => {
    this.setState({ isShowMessage: true });
    setTimeout(() => this.setState({ isShowMessage: false }), 3000);
  };

  validate = async () => {
    await this.setState({ errors: [] });
    if (this.state.isFirst === false) {
      if (
        this.nameInput.current?.value.trim() !== undefined &&
        this.nameInput.current?.value.trim().length < 3
      ) {
        this.setState({ errors: [...this.state.errors, 'name'] });
      }
      if (
        this.surNameInput.current?.value.trim() !== undefined &&
        this.surNameInput.current?.value.trim().length < 3
      ) {
        this.setState({ errors: [...this.state.errors, 'surName'] });
      }
      if (this.dateInput.current?.value !== undefined) {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        const selectDateArray = this.dateInput.current?.value.split('-');
        const selectYear = Number(selectDateArray[0]);
        const selectMonth = Number(selectDateArray[1]);
        if (
          selectYear - currentYear > 0 ||
          this.dateInput.current.value === null ||
          selectMonth - currentMonth !== 1
        ) {
          this.setState({ errors: [...this.state.errors, 'date'] });
        }
      }
      if (!this.dateInput.current?.value.length) {
        this.setState({ errors: [...this.state.errors, 'date'] });
      }
      if (!this.citySelect.current?.value.length) {
        this.setState({ errors: [...this.state.errors, 'city'] });
      }
      if (!this.maleInput.current?.checked && !this.femaleInput.current?.checked) {
        this.setState({ errors: [...this.state.errors, 'gender'] });
      }
      if (!this.agreeInput.current?.checked) {
        this.setState({ errors: [...this.state.errors, 'agree'] });
      }
      if (!this.fileInput.current?.value.length) {
        this.setState({ errors: [...this.state.errors, 'file'] });
      }
    }
    this.state.errors.length !== 0
      ? this.setState({ isDisabled: true })
      : this.setState({ isDisabled: false });
  };

  handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await this.validate();
    this.setState({ isSubmited: true });
    if (this.state.errors.length === 0) {
      if (this.fileInput.current?.files) {
        this.props.updateData(
          this.nameInput.current?.value,
          this.surNameInput.current?.value,
          this.dateInput.current?.value,
          this.citySelect.current?.value,
          this.maleInput.current?.checked,
          this.femaleInput.current?.checked,
          URL.createObjectURL(this.fileInput.current.files[0])
        );
        this.showMess();
        this.form.current?.reset();
        this.setState({ isDisabled: true });
        this.setState({ isFirst: true });
        this.setState({ isSubmited: false });
      }
    } else {
      this.setState({ isDisabled: true });
      await this.validate();
    }
  };

  render() {
    return (
      <section data-testid="forms" className="section-form">
        <h1>Complete Form</h1>
        <form
          onSubmit={this.handleSubmit}
          onInput={this.firstInput}
          className="form"
          ref={this.form}
          data-testid="submit"
        >
          <label htmlFor="firstName">
            <p className="label-name-item">Name:</p>
            <input type="text" ref={this.nameInput} data-testid="input-name" />
            {this.state.errors.includes('name') && (
              <p className="error" data-testid="input-name-error">
                Name must be longer than 3 letters
              </p>
            )}
          </label>
          <label htmlFor="surName">
            <p className="label-name-item">Surname:</p>
            <input type="text" ref={this.surNameInput} data-testid="input-surname" />
            {this.state.errors.includes('surName') && (
              <p className="error" data-testid="input-surname-error">
                SurName must be longer than 3 letters
              </p>
            )}
          </label>
          <label htmlFor="date">
            <p className="label-name-item">Date of this month:</p>
            <input type="date" data-testid="input-date" ref={this.dateInput} />
            {this.state.errors.includes('date') && (
              <p className="error" data-testid="input-date-error">
                Check date (you should select date of current month)
              </p>
            )}
          </label>
          <label htmlFor="city">
            <p className="label-name-item">Pick your city:</p>
            <select ref={this.citySelect}>
              <option value="" disabled selected hidden>
                Choose city...
              </option>
              <option value="brest">Brest</option>
              <option value="minsk">Minsk</option>
              <option value="grodno">Grodno</option>
            </select>
            {this.state.errors.includes('city') && <p className="error">Choose your city</p>}
          </label>
          <div className="wraper-switch">
            <label>
              <input type="radio" ref={this.maleInput} name="radio" /> Male
            </label>
            <label>
              <input type="radio" ref={this.femaleInput} name="radio" /> Female
            </label>
            {this.state.errors.includes('gender') && <p className="error">Choose your gender</p>}
          </div>
          <label>
            I agree to data processing:
            <input name="isAgree" type="checkbox" ref={this.agreeInput} className="input-agree" />
            {this.state.errors.includes('agree') && <p className="error">You must be agree</p>}
          </label>
          <label htmlFor="photo">
            Upload picture :
            <input type="file" ref={this.fileInput} />
            {this.state.errors.includes('file') && <p className="error">You must add file</p>}
          </label>
          <div className="button-submit">
            <input
              type="submit"
              value="Send"
              className="input-submit"
              disabled={this.state.isDisabled}
            />
          </div>
        </form>
        {this.state.isShowMessage && <p className="message">Form has been submited</p>}
      </section>
    );
  }
}

export { FormRender };
