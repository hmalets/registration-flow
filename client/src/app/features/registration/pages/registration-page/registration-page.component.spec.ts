import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { BehaviorSubject, of } from 'rxjs';

import { RegistrationPageComponent } from './registration-page.component';
import { MaterialModule } from '../../../../core/material/material.module';
import { RegistrationApiService } from '../../services';
import { RegistrationField, RegistrationRequest } from '../../interfaces';
import { FormFieldModule } from '../../../../shared/components/form-field';

const registrationFormFieldsResponseExample: RegistrationField[] = [
  {
    type: 'text',
    name: 'first_name',
    label: 'First Name',
    required: true,
    validations: [
      {
        name: 'regex',
        message: 'Only English characters are allowed.',
        value: '^[a-zA-Z0-9]*$',
      },
    ],
  },
  {
    type: 'email',
    name: 'email',
    label: 'Email',
    required: false,
    validations: [],
  },
  {
    type: 'password',
    name: 'password',
    label: 'Password',
    required: true,
    validations: [],
  },
];

describe('RegistrationPageComponent', () => {
  let component: RegistrationPageComponent;
  let fixture: ComponentFixture<RegistrationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationPageComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormFieldModule,
        MaterialModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: RegistrationApiService,
          useValue: {
            loading$: new BehaviorSubject(false),
            getRegistrationFormFields: () => of(registrationFormFieldsResponseExample),
            register: (_body: RegistrationRequest) => of(true),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display form', () => {
    const form = fixture.nativeElement.querySelector('form');
    const input = form.querySelectorAll('input');
    const label = form.querySelectorAll('mat-label');
    const button = fixture.nativeElement.querySelector('.submit-button');

    expect(form).toBeTruthy();

    expect(input[0].type).toBe('text');
    expect(label[0].innerText).toContain('First Name');
    expect(label[0].innerText).toContain('*');

    expect(input[1].type).toBe('email');
    expect(label[1].innerText).toContain('Email');
    expect(label[1].innerText).not.toContain('*');

    expect(input[2].type).toBe('password');
    expect(label[2].innerText).toContain('Password');
    expect(label[2].innerText).toContain('*');

    expect(button.disabled).toBeTruthy();
  });

  it('should validate fields', () => {
    const form = fixture.nativeElement.querySelector('form');
    const input = form.querySelector('input');

    input.value = '@test';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(input.classList).toContain('ng-invalid');

    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(input.classList).not.toContain('ng-invalid');
  });

  it('should enable button, send request and redirect to welcome', () => {
    const apiService = TestBed.inject(RegistrationApiService);
    spyOn(apiService, 'register').and.callThrough();

    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    const form = fixture.nativeElement.querySelector('form');
    const input = form.querySelectorAll('input');

    input[0].value = 'name';
    input[0].dispatchEvent(new Event('input'));

    input[2].value = 'password';
    input[2].dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.submit-button');
    expect(button.disabled).toBeFalsy();

    button.click();
    fixture.detectChanges();

    expect(apiService.register).toHaveBeenCalledWith({
      first_name: 'name',
      email: '',
      password: 'password',
    });

    expect(router.navigate).toHaveBeenCalledWith(['welcome']);
  });
});
