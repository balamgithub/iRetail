import { LayoutComponent } from './pages/layout/layout.page';
import { RouterModule, Routes } from '@angular/router';

const layoutRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then((m) => m.DashboardModule)
      }
    ],
  }
];

export const layoutRouting = RouterModule.forChild(layoutRoutes);
