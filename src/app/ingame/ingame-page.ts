import { Component, signal, NgZone } from '@angular/core';

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
    selector: 'ingame-page',
    standalone: true,
    imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    templateUrl: './ingame-page.html',
    styleUrls: ['./ingame-page.css']
})
export class IngamePage {
    username = signal('');

    constructor(private appState: AppStateService, private ngZone: NgZone) {

    }

}
