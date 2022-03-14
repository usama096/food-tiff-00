import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }
  private url = `${environment.apiUrl}/file`;

  uploadFile(file: any): Observable<any> {
    return this.http.post<any>(this.url, file)
  }
}
