import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, Subject, takeUntil } from 'rxjs';

import { RegistrationApiService } from '../../services';
import { RegistrationField, RegistrationRequest } from '../../interfaces';
import { UserService } from '../../../../core/services';
import { getValidatorFn } from '../../utils';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPageComponent implements OnInit, OnDestroy {
  public loading$: Observable<boolean>;
  public form: FormGroup;
  public registrationFields: RegistrationField[];

  private destroy$: Subject<void> = new Subject();

  constructor(
    private registrationApiService: RegistrationApiService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
  ) {}

  public ngOnInit(): void {
    this.loading$ = this.registrationApiService.loading$.asObservable();

    this.registrationApiService
      .getRegistrationFormFields()
      .pipe(takeUntil(this.destroy$))
      .subscribe(fields => {
        this.registrationFields = fields;
        this.initForm(fields);
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public submit(): void {
    const body: RegistrationRequest = this.form.value;
    this.registrationApiService
      .register(body)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.userService.setIsAuthorized(true);
          this.router.navigate(['welcome']);
        },
        error: ({ error }) => this.snackbar.open(error.message),
      });
  }

  private initForm(fields: RegistrationField[]): void {
    this.form = this.formBuilder.group(
      fields.reduce((controls: { [key: string]: any }, field: RegistrationField) => {
        controls[field.name] = ['', (field.validations || []).map(getValidatorFn)];
        return controls;
      }, {}),
    );
  }
}
