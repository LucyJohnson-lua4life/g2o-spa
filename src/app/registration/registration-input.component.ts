import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppStateService } from '../app-state-service';
import { RegistrationStateService } from './registration-state-service';
import { sha256 } from '@noble/hashes/sha2.js';
import { utf8ToBytes, bytesToHex } from '@noble/hashes/utils.js';

declare const squirrel: any;

@Component({
  selector: 'registration-input',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, MatCardModule, MatFormFieldModule, MatInputModule],
  templateUrl: './registration-input.html',
  styleUrls: ['./registration-input.css']
})
export class RegistrationInput {

  // template-driven form properties
  userName = "";
  userPassword = "";
  // helpers
  registrationFailed = false;
  constructor(
    private appState: AppStateService,
    private ngZone: NgZone,
    private registrationStateService: RegistrationStateService,
    private cd: ChangeDetectorRef
  ) {
    (window as any).runRegistrationUserExists = this.runRegistrationUserExists.bind(this);
    (window as any).runRegistrationSuccess = this.runRegistrationSuccess.bind(this);
  }

  attemptRegistration() {
    const jsonData: any = this.registrationStateService.getState();
    jsonData.username = this.userName;
    jsonData.passwordSha = bytesToHex(sha256(utf8ToBytes(this.userPassword)));
    jsonData.messageContext = "attemptRegistration";
    squirrel.call("sendToServerHandler", JSON.stringify(jsonData));
  }

  backToLogin() {
    this.appState.setContext(0);
  }

  onUsernameInput(event: Event) {
    this.userName = (event.target as HTMLInputElement).value;
  }

  onPasswordInput(event: Event) {
    this.userPassword = (event.target as HTMLInputElement).value;
  }

  runRegistrationUserExists() {
    this.ngZone.run(() => {

      this.registrationFailed = true;
      // ensure change detection runs (handles OnPush parents or other edge-cases)
      this.cd.markForCheck();
      squirrel.call("cefLog", "cefLog: RegistrationUserExists");
    });
  }
  runRegistrationSuccess() {
    this.ngZone.run(() => {
      squirrel.call("cefLog", "RegistrationSuccess");
      this.appState.setContext(2);
    });
  }
}
