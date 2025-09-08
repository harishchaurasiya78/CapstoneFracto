import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <main class="container-fluid p-0">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    main {
      min-height: calc(100vh - 76px);
    }
  `]
})
export class AppComponent {
  title = 'Fracto - Doctor Appointment Booking';
}
