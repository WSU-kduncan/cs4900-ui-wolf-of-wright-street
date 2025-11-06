import { Component, computed, signal } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

type Category = { id: number; name: string; amount: number };

@Component({
  selector: 'app-budget-chart',
  standalone: true,
  imports: [NgChartsModule, NgIf, NgFor],
  templateUrl: './budget-chart.component.html',
  styleUrls: ['./budget-chart.component.scss'],
})
export class BudgetChartComponent {
  // total budget
  budget = signal<number>(2500);

  // editable sample data
  categories = signal<Category[]>([
    { id: 1, name: 'Rent', amount: 1200 },
    { id: 2, name: 'Groceries', amount: 450 },
    { id: 3, name: 'Utilities', amount: 180 },
    { id: 4, name: 'Transport', amount: 220 },
  ]);

  // sums
  used = computed(() =>
    this.categories().reduce((sum, c) => sum + c.amount, 0)
  );
  remaining = computed(() => Math.max(this.budget() - this.used(), 0));
  over = computed(() => Math.max(this.used() - this.budget(), 0));

  // Chart data derived from categories + remaining
  pieLabels = computed<string[]>(() => {
    const labels = this.categories().map(c => c.name);
    if (this.remaining() > 0) labels.push('Remaining');
    return labels;
  });

  pieData = computed<number[]>(() => {
    const data = this.categories().map(c => c.amount);
    if (this.remaining() > 0) data.push(this.remaining());
    return data;
  });

  pieConfig = computed<ChartConfiguration<'doughnut'>>(() => ({
    type: 'doughnut',
    data: {
      labels: this.pieLabels(),
      datasets: [
        {
          data: this.pieData(),
          // do not set colors; default palette is fine for the assignment
        },
      ],
    },
    options: {
      responsive: true,
      cutout: '45%',
      plugins: {
        legend: { position: 'right' },
        tooltip: { enabled: true },
      },
    },
  }));

  // helpers for the list view
  percentOfBudget(cat: Category): number {
    return Math.round((cat.amount / this.budget()) * 100);
  }
}

