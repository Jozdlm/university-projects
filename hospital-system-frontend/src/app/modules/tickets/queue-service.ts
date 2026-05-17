import { HttpClient } from '@angular/common/http';
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
    return this.http
      .get<ApiResponse<QueueList>>(`${this.apiUrl}/queue/${id}`)
      .pipe(map((res) => res.data));
  }

  public callNextTicket(clinicId: number) {
    return this.http.put(`${this.apiUrl}/queue/${clinicId}/call-next`, {});
  }

  public markAsAttend(ticketId: number) {
    return this.http.put(`${this.apiUrl}/tickets/${ticketId}/attend`, {});
  }

  public markAsCancel(ticketId: number) {
    return this.http.put(`${this.apiUrl}/tickets/${ticketId}/cancel`, {});
  }
}
