import {Component, OnInit} from '@angular/core';
import {Ticket} from '../interfaces/ticket.interface'
import {formatDate} from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import './app.component.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  bucket: Ticket[] = [];
  tickets: Ticket[] = [];

  ngOnInit(): void {
    this.render()
  }

  render():void {
    for (let i = 0; i < 8; i++) {
      this.tickets[i] = {
        id: uuidv4(),
        price: 120,
        name: i.toString(),
        date: formatDate(new Date(), 'yyyy/MM/dd', 'en')
      }
    }
  }

  addToBucket(ticket: Ticket): void {
    this.bucket.push(ticket);

  }
}
