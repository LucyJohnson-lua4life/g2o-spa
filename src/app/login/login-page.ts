import { Component, signal, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AppStateService } from '../app-state-service';
import { sha256 as sha256Sync } from 'js-sha256';
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

    constructor(private appState: AppStateService, private ngZone: NgZone) {
        (window as any).runLoginFailed = this.runLoginFailed.bind(this);
    }

    async sha256(message: string): Promise<string> {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
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
            passwordSha: sha256Sync(this.password()), 
            messageContext: "attemptLogin"
        };
        squirrel.call("sendToServerHandler", JSON.stringify(jsonData));
    }

    register() {
        this.appState.setContext(1);
    }
    runLoginFailed() {
        this.ngZone.run(() => {

            squirrel.call("cefLog", "LoginFailed");
        });
    }
    runLoginSuccess() {
        this.ngZone.run(() => {

            squirrel.call("cefLog", "LoginSuccess");
        });
    }
}
