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
      },
      {
        path: 'suggestionhistory',
        loadChildren: () =>
          import('../suggestion-history/suggestion-history.module').then((m) => m.SuggestionHistoryModule)
      }
    ],
  }
];

export const layoutRouting = RouterModule.forChild(layoutRoutes);
