import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { EditTransactionComponent } from './components/edit-transaction/edit-transaction.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wolf-budget-ui-app';
}

