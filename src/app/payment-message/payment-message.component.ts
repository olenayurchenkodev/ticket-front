import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {DialogComponent} from "../dialog/dialog.component";
import {EPaymentState} from "../enums/tickets.enum";


@Component({
  selector: 'app-paymentMessage',
  templateUrl: './payment-message.component.html',
  styleUrls: ['./payment-message.component.css']
})
export class PaymentMessageComponent implements OnInit{
  public message: string;
  public title: string;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {success: boolean, status: string},
  ) {  }

  closeModal(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.title = this.data.success ? EPaymentState.Success : EPaymentState.Error;
    this.message = this.data.status;
  }
}
