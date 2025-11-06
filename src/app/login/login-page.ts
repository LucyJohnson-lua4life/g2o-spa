import { Component, signal, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AppStateService } from '../app-state-service';
import { sha256 } from '@noble/hashes/sha2.js';
import { utf8ToBytes, bytesToHex } from '@noble/hashes/utils.js';
declare const squirrel: any;

@Component({
    selector: 'login-page',
    standalone: true,
    imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    templateUrl: './login-page.html',
    styleUrls: ['./login-page.css']
})
export class LoginPage {
    username = signal('');
    password = signal('');
    loginHasFailed = signal(false);

    constructor(private appState: AppStateService, private ngZone: NgZone) {
        (window as any).runLoginFailed = this.runLoginFailed.bind(this);
        (window as any).runLoginSuccess = this.runLoginSuccess.bind(this);
    }

    loginFailed() {
        return this.loginHasFailed();
    }

    onUsernameInput(event: Event) {
        this.username.set((event.target as HTMLInputElement).value);
    }

    onPasswordInput(event: Event) {
        this.password.set((event.target as HTMLInputElement).value);
    }

    login() {
        const jsonData = {
            username: this.username(),
            passwordSha: bytesToHex(sha256(utf8ToBytes(this.password()))), 
            messageContext: "attemptLogin"
        };
        squirrel.call("sendToServerHandler", JSON.stringify(jsonData));
    }

    register() {
        this.appState.setContext(1);
    }
    runLoginFailed() {
        this.ngZone.run(() => {

            this.loginHasFailed.set(true);
            squirrel.call("cefLog", "LoginFailed");
        });
    }
    runLoginSuccess() {
        this.ngZone.run(() => {

            squirrel.call("cefLog", "LoginSuccess");
            this.appState.setContext(2);
        });
    }
}
