import { Directive, HostListener, HostBinding, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: 'img[appImageLoader]',
  standalone: true
})
export class ImageLoaderDirective {
  private el = inject(ElementRef<HTMLImageElement>);
  
  fallback = input<string>('assets/no-poster.png');

  @HostBinding('class.img-loading') 
  get isLoading() { return !this.loaded; }

  @HostBinding('class.img-loaded') 
  loaded = false;

  @HostBinding('class.img-error') 
  hasError = false;

  @HostListener('load')
  onLoad(): void {
    this.loaded = true;
  }

  @HostListener('error')
  onError(): void {
    this.hasError = true;
    this.loaded = true;
    this.el.nativeElement.src = this.fallback();
  }
}