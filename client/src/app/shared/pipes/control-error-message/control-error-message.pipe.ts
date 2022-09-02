import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'controlErrorMessage',
})
export class ControlErrorMessagePipe implements PipeTransform {
  public transform(errors: ValidationErrors | null): string {
    if (errors && errors['required']) {
      return 'This field is required';
    }

    return errors ? Object.values(errors)[0] : '';
  }
}
