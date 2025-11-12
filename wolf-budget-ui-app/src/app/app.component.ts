import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InsertTransactionComponent } from './components/insert-transaction/insert-transaction.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InsertTransactionComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wolf-budget-ui-app';
}

