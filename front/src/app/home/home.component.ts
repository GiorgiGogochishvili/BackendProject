import { Component } from '@angular/core';
import {AdminService} from "../services/admin.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  isAdmin: boolean = false;

  constructor(private adminService: AdminService) {
    this.adminService.isAdmin$.subscribe(isAdmin => this.isAdmin = isAdmin);
  }

  swapToAdmin() {
    this.isAdmin = !this.isAdmin;
    this.adminService.setIsAdmin(this.isAdmin);
  }
}
