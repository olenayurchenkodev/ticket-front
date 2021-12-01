import {Component, OnInit} from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import './app.component.css';
import {Ticket} from './ticket/ticket.component';
import {TicketDataService} from "./services/ticketData.service";
import {Subscription} from "rxjs";
import {DialogComponent} from "./dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  receiveData: Subscription;
  bucket: Ticket[] = [];
  tickets: Ticket[] = [
    {price: 120, id: uuidv4()},
    {price: 120, id: uuidv4()},
    {price: 120, id: uuidv4()},
    {price: 60, id: uuidv4()},
    {price: 60, id: uuidv4()},
    {price: 60, id: uuidv4()},
  ];

  constructor(
    public shareTicket: TicketDataService,
    public dialog: MatDialog
  ) {
    this.receiveData = this.shareTicket.getClickEvent()
      .subscribe(s => {
        this.addToBucket(s)
      })
  }

  ngOnInit(): void {
  }

  addToBucket(ticket: Ticket): void {
    this.bucket.push(ticket);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {name: 'name', animal: 'animal'},
    });

    dialogRef.afterClosed().subscribe(s => {
      console.log('The dialog was closed');
    });
  }
}
