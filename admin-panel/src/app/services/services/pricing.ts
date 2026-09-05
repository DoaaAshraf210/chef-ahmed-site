import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
export interface SizePricing {
  id: number;
  sizeLabel: string;
  price: string;
  displayOrder: number;
}

export interface SpecialPricing {
  id: number;
  label: string;
  price: string;
}
@Injectable({
  providedIn: 'root',
})
export class Pricing {
  private baseUrl = `${environment.apiUrl}/Pricing`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<SizePricing[]> {
    return this.http.get<SizePricing[]>(this.baseUrl);
  }

  add(item: Partial<SizePricing>): Observable<SizePricing> {
    return this.http.post<SizePricing>(this.baseUrl, item);
  }

  update(id: number, item: Partial<SizePricing>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getSpecial(): Observable<SpecialPricing> {
    return this.http.get<SpecialPricing>(`${this.baseUrl}/special`);
  }

  updateSpecial(item: Partial<SpecialPricing>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/special`, item);
  }
}
