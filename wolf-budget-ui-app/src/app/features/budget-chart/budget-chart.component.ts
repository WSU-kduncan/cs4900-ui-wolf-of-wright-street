import { Component, computed, inject, signal } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { toSignal } from '@angular/core/rxjs-interop';

import { TransactionService, UserDto } from '../../services/transaction.service';

type Category = { id: number; name: string; amount: number };

@Component({
  selector: 'app-budget-chart',
  standalone: true,
  imports: [NgChartsModule, NgIf, NgFor],
  templateUrl: './budget-chart.component.html',
  styleUrls: ['./budget-chart.component.scss'],
})
export class BudgetChartComponent {
  private readonly transactionService = inject(TransactionService);

  // Homework: convert Observable<UserDto[]> to a signal with initial []
  readonly users = toSignal(this.transactionService.getUsers(), {
    initialValue: [] as UserDto[],
  });

  // --- static budget + categories for existing chart ---

  readonly budget = signal(3000);

  readonly categories = signal<Category[]>([
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
            '#3B7A57', // Amazon
            '#FFC857', // Mustard
            '#E27D60', // Coral
            '#8A5188', // Latigo Bay
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

  // helpers for the list view
  percentOfBudget(cat: Category): number {
    return Math.round((cat.amount / this.budget()) * 100);
  }
}
