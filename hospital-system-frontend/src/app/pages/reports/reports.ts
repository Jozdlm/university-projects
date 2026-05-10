import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LucideLogOut, LucideChartPie, LucideChartColumn } from '@lucide/angular';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AuthService } from '../../modules/auth/auth-service';
import { ByStatusChart } from '../../components/by-status-chart/by-status-chart';

@Component({
  selector: 'app-reports',
  imports: [
    RouterModule,
    LucideLogOut,
    LucideChartPie,
    LucideChartColumn,
    BaseChartDirective,
    ByStatusChart,
  ],
  templateUrl: './reports.html',
  styles: ``,
})
export class Reports {
  public ticketsByClinic = [
    { clinic: 'Medicina General', tickets: 45 },
    { clinic: 'Oculista', tickets: 32 },
    { clinic: 'Dermatología', tickets: 28 },
    { clinic: 'Oftalmología', tickets: 38 },
    { clinic: 'Cardiología', tickets: 41 },
  ];

  public barChartData = signal<ChartData<'bar'>>({
    labels: this.ticketsByClinic.map((r) => r.clinic),
    datasets: [
      {
        data: this.ticketsByClinic.map((r) => r.tickets),
        backgroundColor: '#14b8a6',
        borderRadius: 8,
        label: 'Turnos Atendidos',
      },
    ],
  });

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { position: 'bottom', display: false },
      tooltip: {
        backgroundColor: '#fff',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        titleColor: '#111827',
        bodyColor: '#6b7280',
      },
    },
    scales: {
      x: {
        grid: { color: '#e5e7eb' },
        ticks: { color: '#6b7280' },
      },
      y: {
        grid: { color: '#e5e7eb' },
        ticks: { color: '#6b7280' },
      },
    },
  };

  public router = inject(Router);
  private authService = inject(AuthService);
  public activeTab = signal<'clinics' | 'status'>('clinics');

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
