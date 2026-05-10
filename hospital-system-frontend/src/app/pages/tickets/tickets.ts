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
import { Ticket } from '../../modules/tickets/ticket-dto';

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

  public selectedClinic = signal<number>(1);
  public clinicTickets = signal<Ticket[]>([]);

  public currentTicket = computed(() => {
    return this.clinicTickets().find((t) => t.ticket.status === 'IN_ATTENTION') ?? null;
  });
  public waitingTickets = computed(() => {
    return this.clinicTickets().filter((t) => t.ticket.status === 'WAITING');
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

  public loadClinicTickets() {
    this.queueService
      .getQueueByClinic(this.selectedClinic())
      .subscribe({ next: (val) => this.clinicTickets.set(val.queue) });
  }

  public handleCallNext() {
    this.queueService
      .callNextTicket(this.selectedClinic())
      .subscribe({ next: (val) => this.loadClinicTickets() });
  }

  public handleAttend(ticketId: number) {
    this.queueService.markAsAttend(ticketId).subscribe({
      next: (val) => this.loadClinicTickets(),
    });
  }

  public handleCancel(ticketId: number) {
    this.queueService.markAsCancel(ticketId).subscribe({
      next: (val) => this.loadClinicTickets(),
    });
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
