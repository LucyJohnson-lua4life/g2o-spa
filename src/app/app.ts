import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharacterCreator } from './character-creator.component';
import { RegistrationInput } from "./registration-input.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CharacterCreator, RegistrationInput],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('g2o-spa');
}
