import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

interface CloudinaryResponse {
  secure_url: string;
}
@Injectable({
  providedIn: 'root',
})
export class Cloudinary {
  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', environment.cloudinary.uploadPreset);

    const url = `https://api.cloudinary.com/v1_1/${environment.cloudinary.cloudName}/image/upload`;

    return this.http.post<CloudinaryResponse>(url, formData).pipe(map((res) => res.secure_url));
  }
}
