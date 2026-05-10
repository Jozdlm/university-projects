import { Component, signal } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-by-status-chart',
  imports: [BaseChartDirective],
  templateUrl: './by-status-chart.html',
  styles: ``,
})
export class ByStatusChart {
  public ticketsByStatus = [
    { status: 'Atendidos', value: 124, color: '#14b8a6' },
    { status: 'En Espera', value: 38, color: '#f59e0b' },
    { status: 'En Atención', value: 5, color: '#3b82f6' },
    { status: 'Cancelados', value: 17, color: '#ef4444' },
  ];

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom', display: false },
      tooltip: { enabled: true },
    },
  };

  public pieChartData = signal<ChartData<'pie'>>({
    labels: this.ticketsByStatus.map((r) => r.status),
    datasets: [
      {
        data: this.ticketsByStatus.map((r) => r.value),
        backgroundColor: this.ticketsByStatus.map((r) => r.color),
      },
    ],
  });
}
