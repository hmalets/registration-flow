import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPasswordDirective } from './show-password.directive';

@Component({
  template: `
    <input #inputElement type="password" />
    <button [showPassword]="inputElement"></button>
  `,
})
class TestHostComponent {}

describe('ShowPasswordDirective', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowPasswordDirective, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add icon to button', () => {
    const button = fixture.nativeElement.querySelector('button');
    const icon = button.firstChild;

    expect(icon.tagName).toBe('SPAN');
    expect(icon.innerText).toBe('visibility');
  });

  it('should toggle icon and field type', () => {
    const button = fixture.nativeElement.querySelector('button');
    const icon = button.firstChild;
    const field = fixture.nativeElement.querySelector('input');

    button.click();
    fixture.detectChanges();

    expect(icon.innerText).toBe('visibility_off');
    expect(field.type).toBe('text');

    button.click();
    fixture.detectChanges();

    expect(icon.innerText).toBe('visibility');
    expect(field.type).toBe('password');
  });
});
