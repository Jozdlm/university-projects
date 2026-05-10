import { Component, computed, input, signal } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

interface TicketByStatus {
  status: string;
  value: number;
  color: string;
}

@Component({
  selector: 'app-by-status-chart',
  imports: [BaseChartDirective],
  templateUrl: './by-status-chart.html',
  styles: ``,
})
export class ByStatusChart {
  public ticketsByStatus = input<TicketByStatus[]>([]);

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom', display: false },
      tooltip: { enabled: true },
    },
  };

  public pieChartData = computed<ChartData<'pie'>>(() => ({
    labels: this.ticketsByStatus().map((r) => r.status),
    datasets: [
      {
        data: this.ticketsByStatus().map((r) => r.value),
        backgroundColor: this.ticketsByStatus().map((r) => r.color),
      },
    ],
  }));
}
