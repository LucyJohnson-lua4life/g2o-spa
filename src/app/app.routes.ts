import { Routes } from '@angular/router';
import { LoginPage } from './login/login-page';
import { RegistrationPage } from './registration/registration-page';
import { IngamePage } from './ingame/ingame-page';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginPage },
    { path: 'registration', component: RegistrationPage },
    { path: 'ingame', component: IngamePage },
    { path: '**', redirectTo: 'login' },    
];
