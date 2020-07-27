import { Component, OnInit, OnChanges } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormBuilder , Validators } from '@angular/forms';
import { CardType, CardTypeAvaible } from '../shared/interfaces/card-type.interface';
import { PaymentResponse } from '../shared/interfaces/payment-response.interface';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {


  cardTypes: CardType[];
  cardTypeSelected: CardType;
  cardAvaibleTypes: CardTypeAvaible[] = [CardTypeAvaible.VISA, CardTypeAvaible.MASTERCARD, CardTypeAvaible.AMEX];
  isLoading: boolean = true;
  isSubmitted: boolean = false;
  isSuccess: boolean = false;
  paymentForm: FormGroup;
  paymentResponse: PaymentResponse;
  cardNumberMask: string = '0000 0000 0000 0000';


  constructor(
    private dataService: DataService,
    private fb: FormBuilder
  ) {
    this.updateCardNumberMask();
    this.dataService.getListOfCardTypes().subscribe((res) => {
      if (res.cardTypes && res.cardTypes.length > 0) {
        this.cardTypes = res.cardTypes.filter((item) => this.cardAvaibleTypes.includes(item.value));
        this.isLoading = false;
      } 
    }, (err) => {
      console.error(err.message);
    });
  }

  updateCardNumberMask() {
    if (this.cardTypeSelected) {
      const nameType = this.cardTypeSelected.value.toLowerCase();
      if (nameType === CardTypeAvaible.AMEX.toLowerCase()) {
        this.cardNumberMask = '0000 000000 00000';
      } else {
        this.cardNumberMask = '0000 0000 0000 0000';
      }
    } else {
      this.cardNumberMask = '0000 0000 0000 0000';
    }
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.paymentForm = this.fb.group({
      cardType: [null, [Validators.required]],
      cardNumber: [null, [Validators.required]],
      cardExpiry: [null, [Validators.required]],
      cardCRV: [null, [Validators.required]],
      cardName: [null, [Validators.required, Validators.maxLength(50)]],
      email: [null, [Validators.email]]
    });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      this.isSubmitted = true;
      this.isLoading = true;
      this.dataService.submitPayment(this.paymentForm.value).subscribe((res) => {
        if (res.responseCode === '00') {
          this.isSuccess = true;
        }
        this.paymentResponse = res;
        this.isLoading = false;
      }, (err) => {
        this.paymentResponse = err.error;
        this.isLoading = false;
        this.isSuccess = false;
      });
    }
  }

}
