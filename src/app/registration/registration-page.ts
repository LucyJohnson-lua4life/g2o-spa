import { Component, signal } from '@angular/core';
import { CharacterCreator } from './character-creator.component';
import { RegistrationInput } from "./registration-input.component";

@Component({
  selector: 'registration-page',
  imports: [CharacterCreator, RegistrationInput],
  templateUrl: './registration-page.html',
  styleUrl: './registration-page.css'
})
export class RegistrationPage {
}
