import { Injectable, signal } from '@angular/core';

export enum GameContext {
  LOGIN = 0,
  REGISTRATION = 1,
  INGAME = 2
}

@Injectable({ providedIn: 'root' })
export class AppStateService {
  readonly context = signal<GameContext>(GameContext.LOGIN);

  setContext(ctx: GameContext) {
    this.context.set(ctx);
  }

  get current(): GameContext {
    return this.context();
  }
}