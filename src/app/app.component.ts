import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarModule } from "./pages/nav-bar/nav-bar.module";
import { NavBarComponent } from "./pages/nav-bar/nav-bar.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule, NavBarModule, NavBarComponent]
})
export class AppComponent {
  title = 'weather-proj';
}
