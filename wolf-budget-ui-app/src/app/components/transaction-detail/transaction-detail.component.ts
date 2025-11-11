import { Component, Input, signal } from '@angular/core'; 

@Component({
  selector: 'app-transaction-detail',
  imports: [],
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.scss',
  standalone: true
})
export class TransactionDetailComponent {
  @Input({required: true}) transaction: {id: number, name: string} | null = null;
}
