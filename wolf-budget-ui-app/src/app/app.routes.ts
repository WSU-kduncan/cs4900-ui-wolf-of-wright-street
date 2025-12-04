import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudFormComponent } from './components/crud-form/crud-form.component';
import { TransactionsPageComponent } from './components/transactions-page/transactions-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/transactions', pathMatch: 'full' },
   { path: 'transactions', component: TransactionsPageComponent },
  
  { path: 'transactions/new', component: CrudFormComponent },   // Add
  { path: 'transactions/:id', component: CrudFormComponent },   // Edit
  { path: '**', redirectTo: '/transactions' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}