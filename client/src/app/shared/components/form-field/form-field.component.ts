import { ChangeDetectionStrategy, Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent<T> implements ControlValueAccessor {
  @Input() public type: string = 'text';
  @Input() public label: string;
  @Input() public required: boolean;
  @Input() public placeholder: string = '';

  public control: FormControl;

  private value: T;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
  }

  public ngOnInit(): void {
    //@ts-ignore
    this.control = this.ngControl?.control;
  }

  public onChange: (_: any) => void = (_: any) => {};
  public onTouched: () => void = () => {};

  public writeValue(value: any): void {
    if (this.control) {
      this.value = value;
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
