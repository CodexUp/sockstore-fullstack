import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private apiUrl =
    'https://sockstore-fullstack.onrender.com/api/upload';

  constructor(
    private http: HttpClient
  ) {}

  uploadImage(file: File) {

    const formData = new FormData();

    formData.append('file', file);

    return this.http.post<any>(
      this.apiUrl,
      formData
    );

  }

}