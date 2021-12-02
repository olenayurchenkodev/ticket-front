import {StripeCardElementChangeEvent} from "@stripe/stripe-js";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StripeCardComponent, StripeService} from "ngx-stripe";
import {Component, Inject, OnInit, ViewChild} from '@angular/core';

import {TokenCardService} from "../services/token-card.service";
import {cardOptions, elementsOptions} from "../config/config";
import {IPaymentData} from "../interfaces/payment-data.interface";
import {catchError, Observable, of, switchMap} from "rxjs";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  public isValidCard: boolean = false;
  public errorToken: string = '';
  public stripeCardForm: FormGroup;
  public isLoading = false;
  public cardOptions = cardOptions;
  public elementsOptions = elementsOptions;

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    public dialogRef: MatDialogRef<DialogComponent>,
    public tokenCardService: TokenCardService,
    @Inject(MAT_DIALOG_DATA) public data: { amount: number, id: string },
  ) {
  }

  closeModal(): void {
    this.isLoading = false;
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.stripeCardForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(2)]]
    });
  }

  createToken(): void {
    this.isLoading = true;
    const name = this.stripeCardForm.value.name;
    if (this.isValidCard) {
      this.stripeService
        .createToken(this.card.element, {name})
        .pipe(
          catchError(error => error),
          switchMap((result: any) => {
            if (result.token.id) {
              return this.sendPayment({token: result.token.id, amount: this.data.amount, id: this.data.id})
            }
            this.errorToken = result.error.error.message
            this.isLoading = false;
            return of(result);
          }),
          catchError(error => error)
        ).subscribe((dataPayment: { success: boolean, status: string }) => {
        this.dialogRef.close(dataPayment);
      });
    }
  }

  sendPayment(paymentData: IPaymentData): Observable<any> {
    return this.tokenCardService.sendPayment(paymentData.token, paymentData.amount, paymentData.id)
  }

  change(event: StripeCardElementChangeEvent): void {
    this.isValidCard = event.complete;
  }
}
