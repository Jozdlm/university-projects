import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../di-tokens';
import { QueueList } from './ticket-dto';
import { map } from 'rxjs';
import { ApiResponse } from '../../api';

@Injectable({
  providedIn: 'root',
})
export class QueueService {
  private http = inject(HttpClient);
  private apiUrl = inject(API_URL);

  public getQueueByClinic(id: number) {
    const token = localStorage.getItem('token');
    const httpHeaders = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http
      .get<ApiResponse<QueueList>>(`${this.apiUrl}/queue/${id}`, {
        headers: httpHeaders,
      })
      .pipe(map((res) => res.data));
  }
}
