import { Component, OnInit, computed, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistrationPage } from "./registration/registration-page";
import { LoginPage } from './login/login-page';
import { AppStateService, GameContext } from './app-state-service';
import { IngamePage } from "./ingame/ingame-page";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RegistrationPage, LoginPage, IngamePage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  GameContext = GameContext;
  // reference to the signal directly
  context!: Signal<GameContext>;

  constructor(private appState: AppStateService) {}

  ngOnInit() {
    this.context = this.appState.context;
    /*
    window.addEventListener('message', (event) => {
      if (event.data?.type === 'gameContextChange') {
        const newCtx = event.data.context as GameContext;
        this.appState.setContext(newCtx);
      }
    });
    */
  }
}
