import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditTransactionComponent } from './components/edit-transaction/edit-transaction.component';
import { CrudFormComponent } from './components/crud-form/crud-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/transactions', pathMatch: 'full' },
  { path: 'transactions', component: EditTransactionComponent },
  { path: 'transactions/new', component: CrudFormComponent },   // Add
  { path: 'transactions/:id', component: CrudFormComponent },   // Edit
  { path: '**', redirectTo: '/transactions' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
