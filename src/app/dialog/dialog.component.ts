import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StripeCardComponent, StripeService} from "ngx-stripe";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StripeCardElementChangeEvent, StripeCardElementOptions, StripeElementsOptions} from "@stripe/stripe-js";
import {TokenCardService} from "../services/tokenCard.service";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;
  public validCard: boolean = false;
  public stripeCard: FormGroup;

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    public dialogRef: MatDialogRef<DialogComponent>,
    public shareTokenToDB: TokenCardService,
    @Inject(MAT_DIALOG_DATA) public data: {amount: number},
  ) {
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  cardOptions: StripeCardElementOptions = {
    hidePostalCode: true,
    iconStyle: 'solid',
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void{
    this.stripeCard = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(2)]]
    });
  }

  createToken(): void {
    const name = this.stripeCard.value.name;
    if (this.validCard) {
      this.stripeService
        .createToken(this.card.element, {name})
        .subscribe((result) => {
          if (result.token) {
            console.log(result.token.id);
            this.sendPayment(result.token.id, this.data.amount)
          } else if (result.error) {
            console.log(result.error.message);
          }
        });
    }
  }

  sendPayment(token: string, amount: number): void {
    this.shareTokenToDB.sendPayment(token, amount)
      .subscribe(() => {
        this.dialogRef.close(true);
      },
        () => {
          this.dialogRef.close(false);
        })
  }

  change(event: StripeCardElementChangeEvent): void {
    this.validCard = event.complete;
  }
}
