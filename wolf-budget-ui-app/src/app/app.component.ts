import { Component } from '@angular/core';
import { StyleDemoComponent } from './components/style-demo/style-demo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StyleDemoComponent],
  template: `<app-style-demo></app-style-demo>`,
})
export class AppComponent {}
