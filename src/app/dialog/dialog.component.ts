import {Component, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StripeCardComponent, StripeService} from "ngx-stripe";
import {FormBuilder} from "@angular/forms";
import {StripeCardElementOptions, StripeElementsOptions} from "@stripe/stripe-js";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent{
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private fb: FormBuilder, private stripeService: StripeService
  ) {}

  onNoClick(): void {
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
  }

  createToken(): void {
    this.stripeService
      .createToken(this.card.element)
      .subscribe((result) => {
        if (result.token) {
          console.log(result.token.id);
        } else if (result.error) {
          console.log(result.error.message);
        }
      });
  }

}
