import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionsPageComponent } from './components/transactions-page/transactions-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TransactionsPageComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wolf-budget-ui-app';
}

