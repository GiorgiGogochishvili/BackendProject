import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import {AdComponent} from "./ad/ad.component";

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'ads', component: AdComponent },
  { path: '**', redirectTo: 'ads' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
