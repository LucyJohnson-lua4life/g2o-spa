import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistrationPage } from "./registration/registration-page";
import { LoginPage } from './login/login-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RegistrationPage, LoginPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('g2o-spa');
}
