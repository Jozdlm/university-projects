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
  private token = localStorage.getItem('token');
  private httpHeaders = new HttpHeaders({ Authorization: `Bearer ${this.token}` });

  public getQueueByClinic(id: number) {
    return this.http
      .get<ApiResponse<QueueList>>(`${this.apiUrl}/queue/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(map((res) => res.data));
  }

  public callNextTicket(clinicId: number) {
    return this.http.put(
      `${this.apiUrl}/queue/${clinicId}/call-next`,
      {},
      {
        headers: this.httpHeaders,
      },
    );
  }

  public markAsAttend(ticketId: number) {
    return this.http.put(
      `${this.apiUrl}/tickets/${ticketId}/attend`,
      {},
      {
        headers: this.httpHeaders,
      },
    );
  }

  public markAsCancel(ticketId: number) {
    return this.http.put(
      `${this.apiUrl}/tickets/${ticketId}/cancel`,
      {},
      {
        headers: this.httpHeaders,
      },
    );
  }
}
