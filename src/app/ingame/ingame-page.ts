import { Component, signal, NgZone, ChangeDetectorRef } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AppStateService } from '../app-state-service';

declare const squirrel: any;

@Component({
    selector: 'ingame-page',
    standalone: true,
    imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    templateUrl: './ingame-page.html',
    styleUrls: ['./ingame-page.css']
})
export class IngamePage {
    username = signal('');
    showTalkButton = signal(false);

    constructor(private appState: AppStateService, private ngZone: NgZone, private cd: ChangeDetectorRef) {
        (window as any).displayTalkButton = this.displayTalkButton.bind(this);
        (window as any).hideTalkButton = this.hideTalkButton.bind(this);
    }
    displayTalkButton() {
        this.ngZone.run(() => {

            // Show the talk button. External code can call window.displayTalkButton()
            this.showTalkButton.set(true);
            squirrel.call("cefLog", "display hook called");
            this.cd.markForCheck();
        });
    }

    hideTalkButton() {
        this.ngZone.run(() => {

            // Hide the talk button.
            this.showTalkButton.set(false);
                        squirrel.call("cefLog", "hide hook called");
            this.cd.markForCheck();
        });
    }

    onTalkClick() {
        // Handle the talk button click. You can customize behavior here.
        // Hide the button after click to mimic dialog initiation.
        this.showTalkButton.set(false);



    }
}
