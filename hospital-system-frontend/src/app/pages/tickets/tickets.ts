import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
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

type TicketStatus = 'WAITING' | 'IN_ATTENTION' | 'ATTENDED' | 'CANCELLED';

interface Ticket {
  id: number;
  code: string;
  position: number;
  status: TicketStatus;
  clinicId: number;
}

interface Clinic {
  id: number;
  name: string;
  icon: any;
}

@Component({
  selector: 'app-tickets',
  imports: [LucideLogOut, LucideDynamicIcon, LucideCircleCheckBig, LucideCircleX],
  templateUrl: './tickets.html',
  styles: ``,
})
export class Tickets {
  public router = inject(Router);
  private authService = inject(AuthService);

  public clinics: Clinic[] = [
    { id: 1, name: 'Medicina General', icon: LucideStethoscope },
    { id: 2, name: 'Oculista', icon: LucideEye },
    { id: 3, name: 'Dermatología', icon: LucideActivity },
    { id: 4, name: 'Oftalmología', icon: LucideEye },
    { id: 5, name: 'Cardiología', icon: LucideHeart },
  ];

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
    this.tickets.update((prev) => {
      const ticket = prev.find((t) => t.id === ticketId);
      if (ticket?.status === 'IN_ATTENTION') {
        const nextTicket = this.waitingTickets()[0];
        return prev.map((t) => {
          if (t.id === ticketId) return { ...t, status: 'ATTENDED' };
          if (nextTicket && t.id === nextTicket.id) return { ...t, status: 'IN_ATTENTION' };
          return t;
        });
      }
      return prev.map((t) => (t.id === ticketId ? { ...t, status: 'ATTENDED' } : t));
    });
  }

  public handleCancel(ticketId: number) {
    this.tickets.update((prev) => {
      const ticket = prev.find((t) => t.id === ticketId);
      if (ticket?.status === 'IN_ATTENTION') {
        const nextTicket = this.waitingTickets()[0];
        return prev.map((t) => {
          if (t.id === ticketId) return { ...t, status: 'CANCELLED' };
          if (nextTicket && t.id === nextTicket.id) return { ...t, status: 'IN_ATTENTION' };
          return t;
        });
      }
      return prev.map((t) => (t.id === ticketId ? { ...t, status: 'CANCELLED' } : t));
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
