import {NgForm} from '@angular/forms';

export class FormValidator {
  public _form: NgForm;
  public _validationExtra: {
    [field: string]: {
      invalid: boolean,
      touched: boolean,
      errors: {
        required: boolean,
        repeatedValue: boolean
      }
    },
    // more fields
  } = {};

  public inputInvalid(field) {
    if (this._validationExtra[field]) {
      return this._validationExtra[field].invalid && (this._validationExtra[field].touched || this._form.submitted);
    }

    if (!this._form.controls[field]) {
      return false;
    }

    return this._form.controls[field].invalid && (this._form.controls[field].touched || this._form.submitted);
  }

  public inputError(field, error) {
    if (this._validationExtra[field]) {
      return this._validationExtra[field].errors[error];
    }

    if (!this._form.controls[field]) {
      return false;
    }

    return this._form.controls[field].errors[error];
  }

  public inputTouch(field) {
    this._validationExtra[field].touched = true;
  }

  public formInvalid() {
    const attrs = Object.keys(this._validationExtra);
    for (let i = 0; i < attrs.length; i += 1) {
      if (this._validationExtra[attrs[i]].invalid) {
        return true;
      }
    }

    return this._form.invalid;
  }
}
