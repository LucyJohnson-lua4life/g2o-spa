import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

declare const squirrel: any;

@Component({
  selector: 'registration-input',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule, MatFormFieldModule, MatInputModule],
  templateUrl: './registration-input.html',
  styleUrls: ['./registration-input.css']
})
export class RegistrationInput {
  
  // indexes for current selection as signals
  userName = signal("");  
  userPassword = signal("");
  // helpers


  sendToSquirrel() {    
    const jsonData = {};
    squirrel.call("sendToServerHandler", JSON.stringify(jsonData));
  }

}
