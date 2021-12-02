import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {ITicket} from "../interfaces/ticket.interface";
import {TokenCardService} from "../services/token-card.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {PaymentMessageComponent} from "../payment-message/payment-message.component";

@Component({
  selector: 'app-tickets-shop',
  templateUrl: './tickets-shop.component.html',
  styleUrls: ['./tickets-shop.component.css']
})
export class TicketsShopComponent implements OnInit, OnDestroy {
  public unsubscribe$: Subject<void> = new Subject<void>();
  public tickets$: Observable<ITicket[]>;
  public boughtTickets$: Observable<ITicket[]>;
  public isBoughtTicketsListHidden = false;
  public isBuyButtonDisabled = false;
  public boughtTickets: ITicket[] = [];

  constructor(
    public tokenCardService: TokenCardService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getTicketsFromDB();
    this.getBoughtTickets();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  toggle(): void {
    this.isBoughtTicketsListHidden = !this.isBoughtTicketsListHidden
  }

  getTicketsFromDB(): void {
    this.tickets$ = this.tokenCardService.getListOfTickets()
  }

  getBoughtTickets(): void {
    this.boughtTickets$ = this.tokenCardService.getListOfBoughtTickets()
  }

  openDialog(price: number, id: string): void {
    this.isBuyButtonDisabled = true;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: {amount: price, id: id},
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.isBuyButtonDisabled = false;
        if (res) {
          this.openResultDialog(res);
        }
      })
  }

  openResultDialog(resultPayment: { success: boolean, status: string }): void {
    this.dialog.open(PaymentMessageComponent, {
      width: '600px',
      data: resultPayment
    });
  }

}
