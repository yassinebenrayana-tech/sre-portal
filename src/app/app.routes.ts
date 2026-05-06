import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { ItemList } from './components/item-list/item-list'
import { ItemCreate } from './components/item-create/item-create'
;

export const routes: Routes = [
    { path: 'login', component: Login},
  { path: 'dashboard', component: Dashboard },
  { path: 'inventory', component: ItemList },
  { path: 'deploy', component: ItemCreate},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
