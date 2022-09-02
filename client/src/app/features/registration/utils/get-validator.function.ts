import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { FieldValidation } from '../interfaces';

// @ts-ignore
export const getValidatorFn: (validation: FieldValidation) => ValidatorFn = (
  validation: FieldValidation,
) => {
  switch (validation.name) {
    case 'regex':
      return getRegexValidatorFn(validation);
    case 'maxlength':
      return getMaxLengthValidatorFn(validation);
    case 'minlength':
      return getMinLengthValidatorFn(validation);
    default:
      return () => () => null;
  }
};

const getRegexValidatorFn = (validation: FieldValidation) => (control: FormControl) => {
  const regex = new RegExp(<string>validation.value);
  const condition = !control.value || regex.test(control.value);
  return getValidationErrors(condition, validation);
};

const getMaxLengthValidatorFn = (validation: FieldValidation) => (control: FormControl) => {
  const condition = !control.value || control.value.length <= validation.value;
  return getValidationErrors(condition, validation);
};

const getMinLengthValidatorFn = (validation: FieldValidation) => (control: FormControl) => {
  const condition = !control.value || control.value.length >= validation.value;
  return getValidationErrors(condition, validation);
};

const getValidationErrors: (
  condition: boolean,
  validation: FieldValidation,
) => ValidationErrors | null = (condition, validation) => {
  if (condition) {
    return null;
  }
  return { [validation.name]: validation.message };
};
