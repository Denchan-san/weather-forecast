import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SavedUsersComponent } from "./saved-users.component";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

const routes: Routes = [{ path: '', component: SavedUsersComponent }];


@NgModule({
  declarations: [
    SavedUsersComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(routes)
    ],
    exports: [SavedUsersComponent]
})
export class SavedUsersModule { }
