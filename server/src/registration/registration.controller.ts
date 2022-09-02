import { Body, Controller, Get, Post } from '@nestjs/common';

import { delay, Observable, of } from 'rxjs';

import { registrationFormFieldsResponse } from './data/registration-form-fields-response';
import { RegistrationField, RegistrationRequest } from './interfaces';
import { ValidationPipe } from '../shared/pipes';

@Controller('registration')
export class RegistrationController {
  @Get('form')
  getFormFields(): Observable<RegistrationField[]> {
    return of(registrationFormFieldsResponse).pipe(delay(3000));
  }

  @Post()
  async register(
    @Body(new ValidationPipe()) registrationRequest: RegistrationRequest,
  ) {
    return of(true).pipe(delay(2000));
  }
}
