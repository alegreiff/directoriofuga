import { Component } from '@angular/core';

@Component({
  selector: 'loadingSpinner',
  template: `<div class="lds-grid">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>`,
  styleUrls: ['./loading-spiner.component.scss'],
})
export class LoadingSpinnerComponent {}
