import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialog, MatDialogModule} from "@angular/material/dialog";
import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {NgxStripeModule} from 'ngx-stripe';

import {PaymentMessageComponent} from "./payment-message/payment-message.component";
import {TicketComponent} from "./ticket/ticket.component";
import {DialogComponent} from "./dialog/dialog.component";
import {AppComponent} from './app.component';
import {SK} from './config/config';
import { TicketsShopComponent } from './tickets-shop/tickets-shop.component';
import { LoaderComponent } from './loader/loader.component'


@NgModule({
  declarations: [
    AppComponent,
    TicketComponent,
    DialogComponent,
    PaymentMessageComponent,
    TicketsShopComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    NgxStripeModule.forRoot(SK),
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
export class AppModule {
}
