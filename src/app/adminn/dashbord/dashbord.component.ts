import { Component, OnInit } from '@angular/core';
import { ApiAppService } from '../../Service/api-app.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from '../../admin/admin.component';
import { MatTableDataSource } from '@angular/material/table';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { PageEvent } from '@angular/material/paginator';
import { MailModalComponent } from '../../mail/mail.component';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTickets',
})
export class FilterTicketsPipe implements PipeTransform {
  transform(tickets: any[], ticketFilter: string): any[] {
    if (!tickets || !ticketFilter) {
      return tickets;
    }

    return tickets.filter((ticket) => ticket.numeroT.includes(ticketFilter));
  }
}
interface User {
  _id?: any;
  nom?: string;
  prenom?: string;
  genre?: string;
  email?: string;
  telephone?: string;
  password?: string;
  creationDate?: Date;
  idRole?: any;
  idLot?: any;
}

interface Ticket {
  numeroT: '';
}

const USERS: User[] = [];
const USERSS: User[] = [];

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class DashbordComponent implements OnInit {
  users = USERS;
  isProcessing = true;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  isAdding = false;
  expandedElement: User | null;
  columnsToDisplay = ['nom', 'email', 'telephone', 'genre', 'supp', 'mailing'];

  lots: string[];
  lowValue: number = 0;
  highValue: number = 20;
  length = 1000;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  userpag = USERSS;

  ticket: Ticket = {
    numeroT: '',
  };

  successMessage = '';

  constructor(public apiApp: ApiAppService, private modalService: NgbModal) {}

  onPageChanged(e: any) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.userpag = this.users.slice(firstCut, secondCut);
  }

  ngOnInit(): void {
    this.retrieveUsers();
    this.getTickets();
    this.initializeFilteredUsers();
  }
  initializeFilteredUsers(): void {
    this.filteredUsers = [...this.users]; // Copie la liste complète dans filteredUsers
  }

  retrieveUsers(): void {
    this.apiApp.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log(data);
        this.userpag = this.users.slice(0, this.pageSize);
      },
      error: (e) => console.error(e),
    });
  }
  updateFilteredUsers() {
    console.log('Filter:', this.clientNameFilter);

    // Si clientNameFilter est vide, affiche tous les utilisateurs, sinon, filtre
    this.filteredUsers = this.clientNameFilter
      ? (this.users || []).filter(
          (user) => user && user.nom && user.nom.includes(this.clientNameFilter)
        )
      : [...this.users];
    console.log('Filtered Users:', this.filteredUsers);
  }

  expandElement(element: any) {
    this.expandedElement = element || null;
    if (this.expandedElement) {
      this.lots = element.idLot;
      console.log('expandElement', element.idLot);
    }
  }

  onDeleteUser(userId: number): void {
    const modalRef = this.modalService.open(AdminComponent, {
      size: 'sm',
      centered: true,
    });
    modalRef.componentInstance.title = 'Delete';
    modalRef.componentInstance.message =
      'Are you sure you want to delete this user?';

    modalRef.result.then((confirmedDelete: boolean) => {
      if (confirmedDelete) {
        this.isProcessing = true;
        this.apiApp.deleteUser(userId).subscribe((rsp) => {
          this.isProcessing = false;
          if (rsp.success) {
            console.log(rsp);
          } else {
            this.retrieveUsers();
          }
        });
      }
    });
  }

  onSendMail(email: string): void {
    const modalRef = this.modalService.open(MailModalComponent);
    //modalRef.componentInstance.id = 10; pass an id to the modal-component
    console.log('email', email);

    modalRef.result
      .then((result) => {
        const data = {
          emailTo: email,
          sujet: result.sujet,
          message: result.message,
        };
        this.apiApp.sendMail(data).subscribe(
          (res: any) => {
            console.log('ok');
          },
          (err) => {
            if (err) {
              console.log('errooooor');
            }
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
  numTickets: number;

  generateTickets() {
    if (this.numTickets > 0) {
      for (let i = 0; i < this.numTickets; i++) {
        const data = {
          numeroT: this.generateTicketNumber(),
          statusT: 'status',
        };

        this.apiApp.addTicket(data).subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (e) => console.error(e),
        });
      }

      alert(`${this.numTickets} tickets ont été générés avec succès`);
      this.numTickets = 0;
    }
  }

  generateTicketNumber(): string {
    const min = 1000000000;
    const max = 9999999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber.toString();
  }
  tickets: any[] = [];
  lotss: any[] = [];

  deleteTicket(ticketId: string) {
    this.apiApp.deleteTicket(ticketId).subscribe(
      (res: any) => {
        if (res.status === 1) {
          console.log('Ticket supprimé avec succès');
          // Actualisez la liste des tickets après la suppression réussie
          this.getTickets();
        } else {
          console.log('Erreur lors de la suppression du ticket');
        }
      },
      (error) => {
        console.log("Erreur lors de la communication avec l'API");
      }
    );
  }

  ticketFilter: string = '';

  filteredTickets: any[] = [];
  getTickets() {
    this.apiApp.getAllTickets().subscribe(
      (res: any) => {
        if (res.status === 'ok') {
          this.tickets = res.data;
          this.filteredTickets = this.tickets;
          console.log(this.tickets);
        }
      },
      (error) => {
        console.log("Erreur lors de la communication avec l'API");
      }
    );
  }
  updateFilteredTickets() {
    this.filteredTickets = this.ticketFilter
      ? this.tickets.filter((ticket) =>
          ticket.numeroT.includes(this.ticketFilter)
        )
      : this.tickets;
  }
  clientNameFilter: string = '';
  filteredUsers: User[] = [];
}
