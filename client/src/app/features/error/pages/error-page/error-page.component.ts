import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPageComponent {
  public statusCode: HttpStatusCode | number = HttpStatusCode.NotFound;
  public errorMessage: string;

  constructor(private router: Router) {
    this.parseNavigationData();
  }

  public navigateToDashboard(): void {
    this.router.navigate(['/']);
  }

  private parseNavigationData(): void {
    const { status, message } = this.router.getCurrentNavigation()?.extras.state || {};

    if (status) {
      this.statusCode = status;
    }

    this.setErrorMessage(message);
  }

  private setErrorMessage(message: string | undefined): void {
    if (message) {
      this.errorMessage = message;
      return;
    }

    switch (this.statusCode) {
      case HttpStatusCode.NotFound:
        this.errorMessage = 'Requested resource was not found.';
        return;
      case HttpStatusCode.InternalServerError:
        this.errorMessage = 'Internal server error.';
        return;
      default:
        this.errorMessage = 'Something went wrong.';
        return;
    }
  }
}
