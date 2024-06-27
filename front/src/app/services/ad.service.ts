import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Ad} from "../ad";

@Injectable({
  providedIn: 'root'
})
export class AdService {
  private apiUrl = 'http://localhost:3000/advertisements';

  constructor(private http: HttpClient) { }

  getAllAds(): Observable<Ad[]> {
    return this.http.get<Ad[]>(`${this.apiUrl}/all`);
  }

  getAdById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getOne/${id}`);
  }

  createAd(newAd: Ad): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, newAd);
  }

  updateAd(id: string, updatedAd: Ad): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedAd);
  }

  deleteAd(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  approveAd(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/approve/${id}`, {});
  }
}
