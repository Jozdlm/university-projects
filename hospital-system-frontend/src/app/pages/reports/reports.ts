import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LucideLogOut, LucideChartPie, LucideChartColumn } from '@lucide/angular';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reports',
  imports: [RouterModule, LucideLogOut, LucideChartPie, LucideChartColumn, BaseChartDirective],
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

  public ticketsByStatus = [
    { status: 'Atendidos', value: 124, color: '#14b8a6' },
    { status: 'En Espera', value: 38, color: '#f59e0b' },
    { status: 'En Atención', value: 5, color: '#3b82f6' },
    { status: 'Cancelados', value: 17, color: '#ef4444' },
  ];

  public pieChartData = signal<ChartData<'pie'>>({
    labels: this.ticketsByStatus.map((r) => r.status),
    datasets: [
      {
        data: this.ticketsByStatus.map((r) => r.value),
        backgroundColor: this.ticketsByStatus.map((r) => r.color),
      },
    ],
  });

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom', display: false },
      tooltip: { enabled: true },
    },
  };

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
  public activeTab = signal<'clinics' | 'status'>('clinics');

  public handleLogout() {
    this.router.navigate(['/auth/login']);
  }

  public getTabClass(tab: 'clinics' | 'status'): string {
    const base = 'flex-1 px-6 py-4 flex items-center justify-center gap-2 transition-colors';
    return this.activeTab() === tab
      ? `${base} bg-teal-50 text-teal-600 border-b-2 border-teal-600`
      : `${base} text-gray-600 hover:bg-gray-50`;
  }
}
