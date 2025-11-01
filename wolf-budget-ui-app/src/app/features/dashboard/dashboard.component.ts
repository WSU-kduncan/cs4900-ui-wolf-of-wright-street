import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,       // Only if using Angular 15+ standalone components
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  title = 'Dashboard';
}