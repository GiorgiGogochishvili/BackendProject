import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private isAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();
  constructor() { }

  setIsAdmin(isAdmin: boolean) {
    this.isAdminSubject.next(isAdmin);
  }

  getIsAdmin(): boolean {
    console.log(this.isAdminSubject.value);

    return this.isAdminSubject.value;
  }
}
