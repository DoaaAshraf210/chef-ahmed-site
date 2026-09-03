import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
export interface Gateau {
  id: number;
  name: string;
  description?: string;
  imageUrl: string;
  smallSizePrice: number;
  largeSizePrice: number;
  displayOrder: number;
  createdAt?: string;
}
@Injectable({
  providedIn: 'root',
})
export class Gateaux {
  private baseUrl = `${environment.apiUrl}/Gateaux`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Gateau[]> {
    return this.http.get<Gateau[]>(this.baseUrl);
  }

  add(item: Partial<Gateau>): Observable<Gateau> {
    return this.http.post<Gateau>(this.baseUrl, item);
  }

  update(id: number, item: Partial<Gateau>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
