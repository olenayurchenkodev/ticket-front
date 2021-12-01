import {Component, OnInit} from '@angular/core';
import './app.component.css';
import {Ticket} from './ticket/ticket.component';
import {TicketDataService} from "./services/ticketData.service";
import {Subscription} from "rxjs";
import {DialogComponent} from "./dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {TokenCardService} from "./services/tokenCard.service";
import {EPaymentState} from "./enums/tickets.enum";
import {PaymentMessageComponent} from "./paymentMessage/paymentMessage.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  amount: number = 0;
  receiveData: Subscription;
  bucket: Ticket[] = [];
  tickets: Ticket[] = [];

  constructor(
    public shareTicket: TicketDataService,
    public shareFromDB: TokenCardService,
    public dialog: MatDialog
  ) {
    this.receiveData = this.shareTicket.getClickEvent()
      .subscribe(s => {
        this.addToBucket(s[0])
      })
  }

  ngOnInit(): void {
    this.getTicketsFromDB()
  }

  getTicketsFromDB(): void {
    this.shareFromDB.getListOfTickets()
      .subscribe(s => this.tickets = s)
  }

  addToBucket(ticket: Ticket): void {
    this.bucket.push(ticket);
    this.amount += ticket.price!;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: {amount: this.amount},
    });

    dialogRef.afterClosed().pipe().subscribe(res => {
      console.log(res);
      this.openResultDialog(res)
    })
  }

  openResultDialog(result: boolean): void {
    this.dialog.open(PaymentMessageComponent, {
      width: '600px',
      data: {type: result? EPaymentState.Success: EPaymentState.Error}
    });
  }


}
