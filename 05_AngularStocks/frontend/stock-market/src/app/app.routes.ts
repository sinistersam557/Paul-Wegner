import { Routes } from '@angular/router';

import { Login } from './user/login/login';
import { Register } from './user/register/register';
import { StockList } from './stock/stock-list/stock-list';
import { CreateStock } from './stock/create-stock/create-stock';
import { StockDetails } from './stock/stock-details/stock-details';

import { AuthGuard } from './guards/auth-guard';
import { CreateStockDeactivateGuard } from './guards/create-stock-deactivate-guard';
import { StockLoadResolver } from './resolver/stock-load-resolver-resolver';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'stocks/list', component: StockList, canActivate: [AuthGuard] },
    { path: 'stocks/create', component: CreateStock, canActivate: [AuthGuard], canDeactivate: [CreateStockDeactivateGuard] },
    { path: 'stocks/:code', component: StockDetails, canActivate: [AuthGuard], resolve: { stock: StockLoadResolver } },
    { path: '**', redirectTo: '/register' }
];
