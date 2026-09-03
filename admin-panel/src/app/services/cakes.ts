import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
export interface Cake {
  id: number;
  name: string;
  description?: string;
  imageUrl: string;
  isFeatured: boolean;
  displayOrder: number;
  createdAt?: string;
}
@Injectable({
  providedIn: 'root',
})
export class Cakes {
  private baseUrl = `${environment.apiUrl}/Cakes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cake[]> {
    return this.http.get<Cake[]>(this.baseUrl);
  }

  add(item: Partial<Cake>): Observable<Cake> {
    return this.http.post<Cake>(this.baseUrl, item);
  }

  update(id: number, item: Partial<Cake>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
