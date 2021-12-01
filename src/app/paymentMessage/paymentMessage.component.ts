import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";


@Component({
  selector: 'app-paymentMessage',
  templateUrl: './paymentMessage.component.html'
})
export class PaymentMessageComponent implements OnInit{
  message: string;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {type: string},
  ) {
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.message = this.data.type;
  }
}
