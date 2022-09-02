import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

const englishCharactersRegExp = new RegExp('^[a-zA-Z0-9]*$');
const emailRegExp = new RegExp('^[a-z0-9]+@[a-z0-9]+\\.[a-z]{2,}$');
const numbersRegExp = new RegExp('^[0-9]+$');
const oneOrMoreNumbersRegExp = new RegExp('^.*[0-9].*$');
const oneOrMoreLowercaseRegExp = new RegExp('^.*[a-z].*$');
const oneOrMoreUppercaseRegExp = new RegExp('^.*[A-Z].*$');

export class RegistrationRequest {
  @IsNotEmpty({
    message: 'First Name is required.',
  })
  @Matches(englishCharactersRegExp, {
    message: 'Only English characters are allowed for First Name.',
  })
  @MaxLength(63, {
    message: 'First Name must be less than 64 characters.',
  })
  first_name: string;

  @Matches(englishCharactersRegExp, {
    message: 'Only English characters are allowed for Middle Name.',
  })
  @MaxLength(63, {
    message: 'Middle Name must be less than 64 characters.',
  })
  middle_name: string;

  @IsNotEmpty({
    message: 'Last Name is required.',
  })
  @Matches(englishCharactersRegExp, {
    message: 'Only English characters are allowed for Last Name.',
  })
  @MaxLength(63, {
    message: 'Last Name must be less than 64 characters.',
  })
  last_name: string;

  @IsNotEmpty({
    message: 'Email is required.',
  })
  @Matches(emailRegExp, {
    message: 'Only English characters are allowed for Email.',
  })
  @MaxLength(47, {
    message: 'Email must be less than 47 characters.',
  })
  email: string;

  @IsNotEmpty({
    message: 'Phone Number is required.',
  })
  @Matches(numbersRegExp, {
    message: 'Only numbers are allowed for Phone Number.',
  })
  @MinLength(4, {
    message: 'Phone Number must not be less than 4 characters.',
  })
  @MaxLength(9, {
    message: 'Phone Number must be less than 10 characters.',
  })
  phone_number: string;

  @IsNotEmpty({
    message: 'Password is required.',
  })
  @Matches(oneOrMoreNumbersRegExp, {
    message: 'Password must contain at least one number.',
  })
  @Matches(oneOrMoreLowercaseRegExp, {
    message: 'Password must contain at least one lowercase letter.',
  })
  @Matches(oneOrMoreUppercaseRegExp, {
    message: 'Password must contain at least one uppercase letter.',
  })
  @MinLength(8, {
    message: 'Password must not be less than 8 characters.',
  })
  @MaxLength(14, {
    message: 'Password must be less than 15 characters.',
  })
  password: string;
}
