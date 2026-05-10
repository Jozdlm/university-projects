import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../di-tokens';
import { map } from 'rxjs';
import { ReportByStatus, ReportByClinic } from './report-dto';
import { ApiResponse } from '../../api';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private http = inject(HttpClient);
  private apiUrl = inject(API_URL);

  public getReportByStatus() {
    const token = localStorage.getItem('token');
    const httpHeaders = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http
      .get<ApiResponse<ReportByStatus>>(`${this.apiUrl}/admin/reports/by-status`, {
        headers: httpHeaders,
      })
      .pipe(map((res) => res.data.report));
  }

  public getReportByClinic() {
    const token = localStorage.getItem('token');
    const httpHeaders = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http
      .get<ApiResponse<ReportByClinic>>(`${this.apiUrl}/admin/reports/by-clinic`, {
        headers: httpHeaders,
      })
      .pipe(map((res) => res.data.report));
  }
}
