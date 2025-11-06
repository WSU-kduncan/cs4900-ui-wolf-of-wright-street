// src/app/app.component.ts
import { Component } from '@angular/core';
import { BudgetChartComponent } from './features/budget-chart/budget-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BudgetChartComponent],
  template: `<app-budget-chart />`,
})
export class AppComponent {}
