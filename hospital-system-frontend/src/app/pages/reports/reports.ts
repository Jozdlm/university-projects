import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LucideLogOut, LucideChartPie, LucideChartColumn } from '@lucide/angular';
import { AuthService } from '../../modules/auth/auth-service';
import { ByStatusChart } from '../../components/by-status-chart/by-status-chart';
import { ByClinicChart } from '../../components/by-clinic-chart/by-clinic-chart';

@Component({
  selector: 'app-reports',
  imports: [
    RouterModule,
    LucideLogOut,
    LucideChartPie,
    LucideChartColumn,
    ByStatusChart,
    ByClinicChart,
  ],
  templateUrl: './reports.html',
  styles: ``,
})
export class Reports {
  public router = inject(Router);
  private authService = inject(AuthService);
  public activeTab = signal<'clinics' | 'status'>('clinics');

  public ticketsByClinic = [
    { clinic: 'Medicina General', tickets: 45 },
    { clinic: 'Oculista', tickets: 32 },
    { clinic: 'Dermatología', tickets: 28 },
    { clinic: 'Oftalmología', tickets: 38 },
    { clinic: 'Cardiología', tickets: 41 },
  ];

  public ticketsByStatus = [
    { status: 'Atendidos', value: 124, color: '#14b8a6' },
    { status: 'En Espera', value: 38, color: '#f59e0b' },
    { status: 'En Atención', value: 5, color: '#3b82f6' },
    { status: 'Cancelados', value: 17, color: '#ef4444' },
  ];

  public handleLogout() {
    this.authService.logout();
  }

  public getTabClass(tab: 'clinics' | 'status'): string {
    const base = 'flex-1 px-6 py-4 flex items-center justify-center gap-2 transition-colors';
    return this.activeTab() === tab
      ? `${base} bg-teal-50 text-teal-600 border-b-2 border-teal-600`
      : `${base} text-gray-600 hover:bg-gray-50`;
  }
}
