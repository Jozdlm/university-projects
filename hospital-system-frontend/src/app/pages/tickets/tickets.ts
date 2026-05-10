import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
  LucideActivity,
  LucideDynamicIcon,
  LucideEye,
  LucideHeart,
  LucideLogOut,
  LucideStethoscope,
  LucideCircleCheckBig,
  LucideCircleX,
} from '@lucide/angular';
import { AuthService } from '../../modules/auth/auth-service';
import { ClinicService } from '../../modules/tickets/clinic-service';
import { forkJoin, map, switchMap } from 'rxjs';
import { QueueService } from '../../modules/tickets/queue-service';

type TicketStatus = 'WAITING' | 'IN_ATTENTION' | 'ATTENDED' | 'CANCELLED';

interface Ticket {
  id: number;
  code: string;
  position: number;
  status: TicketStatus;
  clinicId: number;
}

interface NavItem {
  id: number;
  name: string;
  icon: any;
  queue: number;
}

@Component({
  selector: 'app-tickets',
  imports: [LucideLogOut, LucideDynamicIcon, LucideCircleCheckBig, LucideCircleX],
  templateUrl: './tickets.html',
  styles: ``,
})
export class Tickets implements OnInit {
  private authService = inject(AuthService);
  private clinicService = inject(ClinicService);
  private queueService = inject(QueueService);

  public navItemIcons = [LucideStethoscope, LucideEye, LucideActivity, LucideEye, LucideHeart];
  public navItems = signal<NavItem[]>([]);

  public initialTickets: Ticket[] = [
    { id: 1, code: 'MED-1234', position: 1, status: 'IN_ATTENTION', clinicId: 1 },
    { id: 2, code: 'MED-1235', position: 2, status: 'WAITING', clinicId: 1 },
    { id: 3, code: 'MED-1236', position: 3, status: 'WAITING', clinicId: 1 },
    { id: 4, code: 'OCU-2156', position: 1, status: 'IN_ATTENTION', clinicId: 2 },
    { id: 5, code: 'OCU-2157', position: 2, status: 'WAITING', clinicId: 2 },
    { id: 6, code: 'DER-3421', position: 1, status: 'WAITING', clinicId: 3 },
    { id: 7, code: 'DER-3422', position: 2, status: 'WAITING', clinicId: 3 },
    { id: 8, code: 'OFT-4789', position: 1, status: 'WAITING', clinicId: 4 },
    { id: 9, code: 'CAR-5643', position: 1, status: 'IN_ATTENTION', clinicId: 5 },
  ];
  public tickets = signal<Ticket[]>(this.initialTickets);
  public selectedClinic = signal<number>(1);

  public clinicTickets = computed(() => {
    return this.tickets().filter((t) => t.clinicId === this.selectedClinic());
  });

  public currentTicket = computed(() => {
    return this.clinicTickets().find((t) => t.status === 'IN_ATTENTION') ?? null;
  });
  public waitingTickets = computed(() => {
    return this.clinicTickets().filter((t) => t.status === 'WAITING');
  });

  public ngOnInit(): void {
    this.loadClinics();
  }

  public loadClinics(): void {
    this.clinicService
      .getClinicList()
      .pipe(
        switchMap((clinics) =>
          forkJoin(
            clinics.map((item, index) => {
              return this.queueService.getQueueByClinic(item.id).pipe(
                map(
                  (queue) =>
                    ({
                      id: item.id,
                      name: item.name,
                      icon: this.navItemIcons[index],
                      queue: queue.count,
                    }) as NavItem,
                ),
              );
            }),
          ),
        ),
      )
      .subscribe({ next: (val) => this.navItems.set(val) });
  }

  public handleCallNext() {
    const nextTicket = this.waitingTickets()[0];
    if (nextTicket) {
      this.tickets.update((prev) =>
        prev.map((t) => {
          if (t.id === nextTicket.id) return { ...t, status: 'IN_ATTENTION' };
          if (t.status === 'IN_ATTENTION' && t.clinicId === this.selectedClinic())
            return { ...t, status: 'ATTENDED' };
          return t;
        }),
      );
    }
  }

  public handleAttend(ticketId: number) {
    this.queueService.markAsAttend(ticketId).subscribe({ next: (val) => this.handleCallNext() });
  }

  public handleCancel(ticketId: number) {
    this.queueService.markAsCancel(ticketId).subscribe({ next: (val) => this.handleCallNext() });
  }

  public onLogOut() {
    this.authService.logout();
  }

  public getClinicTabClass(clinicId: number): string {
    const base =
      'flex-1 min-w-[180px] px-6 py-4 flex items-center justify-center gap-3 transition-colors border-b-2';
    return this.selectedClinic() === clinicId
      ? `${base} bg-teal-50 text-teal-600 border-teal-600`
      : `${base} text-gray-600 hover:bg-gray-50 border-transparent`;
  }
}
