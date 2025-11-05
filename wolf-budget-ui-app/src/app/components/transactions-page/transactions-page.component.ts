import { Component } from '@angular/core';

@Component({
  selector: 'app-transactions-page',
  imports: [],
  templateUrl: './transactions-page.component.html',
  styleUrl: './transactions-page.component.scss'
})
export class TransactionsPageComponent {
  title = "Transactions Page"

  transactions =
  [
    {id: 1, name: "Grocery shopping"},
    {id: 2, name: "Amazon purchase"},
    {id: 3, name: "Loan payment"},
    {id: 4, name: "Taxes"},
    {id: 5, name: "Christmas presents"}
  ]
}
