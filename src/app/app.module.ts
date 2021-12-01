import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NgxStripeModule } from 'ngx-stripe';

import { AppComponent } from './app.component';
import {TicketComponent} from "./ticket/ticket.component";
import {DialogComponent} from "./dialog/dialog.component";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialog, MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {PaymentMessageComponent} from "./paymentMessage/paymentMessage.component";

@NgModule({
  declarations: [
    AppComponent,
    TicketComponent,
    DialogComponent,
    PaymentMessageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    NgxStripeModule.forRoot('pk_test_51K1qeXHdq0KWWsCrNAW0kb6zXfZzu5woq819UZ32fwMzLZIZ2lYLw5beHSXrJahy0UdXpnTlRSx6Ip7wUEibRzPa00DJASL9v3'),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    MatDialog,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
