import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface PortfolioImage {
  id: number;
  imageUrl: string;
  displayOrder: number;
  createdAt?: string;
}
@Injectable({
  providedIn: 'root',
})
export class Portfolio {
  private baseUrl = `${environment.apiUrl}/Portfolio`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<PortfolioImage[]> {
    return this.http.get<PortfolioImage[]>(this.baseUrl);
  }

  add(image: Partial<PortfolioImage>): Observable<PortfolioImage> {
    return this.http.post<PortfolioImage>(this.baseUrl, image);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
