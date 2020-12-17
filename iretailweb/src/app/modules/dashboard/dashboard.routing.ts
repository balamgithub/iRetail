import { DashboardComponent } from './pages/dashboard/dashboard.page';
import { RouterModule, Routes } from '@angular/router';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

export const dashboardRouting = RouterModule.forChild(dashboardRoutes);
