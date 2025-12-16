import { Component, NgZone, ChangeDetectorRef } from '@angular/core';

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
    imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    templateUrl: './login-page.html',
    styleUrls: ['./login-page.css']
})
export class LoginPage {
    // switched to template-driven forms (ngModel)
    username = '';
    password = '';
    loginHasFailed = false;

    constructor(private appState: AppStateService, private ngZone: NgZone, private cd: ChangeDetectorRef) {
        (window as any).runLoginFailed = this.runLoginFailed.bind(this);
        (window as any).runLoginSuccess = this.runLoginSuccess.bind(this);
    }

    loginFailed() {
        return this.loginHasFailed;
    }

    // ngModel two-way binding will update `username` and `password` directly

    login() {
        const jsonData = {
            username: this.username,
            passwordSha: bytesToHex(sha256(utf8ToBytes(this.password))), 
            messageContext: "attemptLogin"
        };
        squirrel.call("sendToServerHandler", JSON.stringify(jsonData));
    }

    register() {
        this.appState.setContext(1);
    }
    runLoginFailed() {
        this.ngZone.run(() => {

            this.loginHasFailed = true;
            // ensure change detection runs for OnPush or other edge cases
            this.cd.markForCheck();
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
