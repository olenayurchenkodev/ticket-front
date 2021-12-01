import {Component, Input, OnInit} from '@angular/core';
import {formatDate} from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import {TicketDataService} from "../services/ticketData.service";
import {Subscription} from "rxjs";

export interface Ticket{
  id: string;
  price: number|null;
  name?: string;
  date?: string | Date;
}

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit{
  clickButton = false
  ticket?: Ticket;
  @Input() id: string = '';
  @Input() price: number|null = null;

  constructor(
    private shareTicket: TicketDataService
  ) {
  }

  ngOnInit(): void {
    this.createTicket(this.id, this.price)
  }

  createTicket(id: string, price: number|null): void {
    this.ticket = {
      id: id,
      price: price,
      name: id,
      date: formatDate(new Date(), 'yyyy/MM/dd', 'en')
    }
  }

  addToBucket(): void {
    this.shareTicket.sendMessage([
      this.ticket
    ]);
    this.clickButton = true
  }

}
