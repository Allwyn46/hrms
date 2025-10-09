import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appStopPropagation]',
})
export class StopPropagation {
  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.stopPropagation();
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: Event) {
    event.stopPropagation();
  }
}
