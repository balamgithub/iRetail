import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './pages/history.page';

const suggestionHistoryRoutes: Routes = [
    {
        path: '',
        component: HistoryComponent
    }
];

export const suggestionHistoryRouting = RouterModule.forChild(suggestionHistoryRoutes);
