import { NgModule } from '@angular/core';
import { NavBarComponent } from './nav-bar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavBarComponent],
  imports: [RouterModule],
  exports: [NavBarComponent],
})
export class NavBarModule {}
