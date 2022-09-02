import { Directive, ElementRef, HostListener, Inject, Input, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[showPassword]',
})
export class ShowPasswordDirective {
  @Input('showPassword') public inputElement: HTMLElement;

  private showPassword: boolean = false;
  private icon: HTMLElement;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  public ngOnInit(): void {
    const button = this.element.nativeElement;
    this.icon = this.document.createElement('span');
    this.renderer.addClass(this.icon, 'material-symbols-outlined');
    this.renderer.setProperty(this.icon, 'innerText', 'visibility');
    this.renderer.appendChild(button, this.icon);
  }

  @HostListener('click')
  public toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
    this.renderer.setProperty(
      this.icon,
      'innerText',
      this.showPassword ? 'visibility_off' : 'visibility',
    );
    this.renderer.setAttribute(this.inputElement, 'type', this.showPassword ? 'text' : 'password');
  }
}
