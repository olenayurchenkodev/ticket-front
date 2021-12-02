import {Component, Input } from '@angular/core';

import {ITicket} from "../interfaces/ticket.interface";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent {
  @Input() ticket: ITicket;
}
