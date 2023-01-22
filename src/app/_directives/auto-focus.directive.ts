import { AfterViewInit, Directive, ElementRef } from '@angular/core'

@Directive({
  selector: 'auto-focus',
})
export class AutoFocus implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}
  ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus()
  }
}
