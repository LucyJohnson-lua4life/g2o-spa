import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistrationPage } from "./registration/registration-page";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RegistrationPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('g2o-spa');
}
