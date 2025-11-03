import { Component, signal, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AppStateService } from '../app-state-service';

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

    onUsernameInput(event: Event) {
        this.username.set((event.target as HTMLInputElement).value);
    }

    onPasswordInput(event: Event) {
        this.password.set((event.target as HTMLInputElement).value);
    }

    login() {
        // TODO: Implement login logic
        alert(`Login with user: ${this.username()} password: ${this.password()}`);
    }

    register() {
        this.appState.setContext(1);
    }
    runLoginFailed() {
        this.ngZone.run(() => {
            alert(`Login failed so far!`);

        });
    }
    runLoginSuccess() {
        this.ngZone.run(() => {
            alert(`Login success!`);
        });
    }
}
