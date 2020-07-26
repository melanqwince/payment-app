import { Component, OnInit, Input } from '@angular/core';
import { PaymentResponse } from '../../shared/interfaces/payment-response.interface';

@Component({
  selector: 'app-payment-result',
  templateUrl: './payment-result.component.html',
  styleUrls: ['./payment-result.component.scss']
})
export class PaymentResultComponent implements OnInit {

  @Input('paymentResponse') paymentResponse: PaymentResponse;
  @Input('isSuccess') isSuccess: boolean;

  constructor() { }

  ngOnInit() {
  }

}
