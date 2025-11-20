import { Component, inject, computed, signal } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { Router } from '@angular/router';

import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-budget-chart',
  standalone: true,
  imports: [NgChartsModule, NgIf, NgFor],
  templateUrl: './budget-chart.component.html',
  styleUrls: ['./budget-chart.component.scss'],
})
export class BudgetChartComponent {
  private readonly service = inject(TransactionService);
  private readonly router = inject(Router);

  readonly transactions = this.service.transactions;

  onDelete(id: number) {
    this.service.deleteTransaction(id).subscribe();
  }

  goToNew() {
    this.router.navigateByUrl('/transactions/new');
  }

  edit(id: number) {
    this.router.navigateByUrl(`/transactions/${id}/edit`);
  }

  readonly budget = signal(3000);

  readonly categories = signal([
    { id: 1, name: 'Housing', amount: 1200 },
    { id: 2, name: 'Food', amount: 600 },
    { id: 3, name: 'Utilities', amount: 300 },
    { id: 4, name: 'Fun', amount: 200 },
  ]);

  readonly used = computed(() =>
    this.categories().reduce((sum, c) => sum + c.amount, 0),
  );

  readonly over = computed(() =>
    Math.max(this.used() - this.budget(), 0),
  );

  readonly remaining = computed(() =>
    Math.max(this.budget() - this.used(), 0),
  );

  readonly pieConfig = computed<ChartConfiguration<'pie'>>(() => ({
    type: 'pie',
    data: {
      labels: this.categories().map(c => c.name),
      datasets: [
        {
          data: this.categories().map(c => c.amount),
          backgroundColor: [
            '#3B7A57',
            '#FFC857',
            '#E27D60',
            '#8A5188',
          ],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '45%',
      plugins: {
        legend: { position: 'right' },
        tooltip: { enabled: true },
      },
    },
  }));

  percentOfBudget(cat: any): number {
    return Math.round((cat.amount / this.budget()) * 100);
  }
}
