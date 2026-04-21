import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideLock, LucideMail } from '@lucide/angular';

@Component({
  selector: 'app-login',
  imports: [FormsModule, LucideLock, LucideMail],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  public email = signal<string>('');
  public password = signal<string>('');

  public handleSubmit = (event: Event) => {
    event.preventDefault();
    console.log(this.email(), this.password());
  };
}
