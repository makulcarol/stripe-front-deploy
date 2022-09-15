import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { CreditCardRequest } from './models/creditCardRequest';
import { StripeService } from './services/stripe/stripe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public cardToValidate: CreditCardRequest[] = [];
  public aprovedCards: number = 0;
  public reprovedCards: number = 0;
  public testedCards: number = 0;

  constructor(private stripeService: StripeService) {}

  ngOnInit(): void {}

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    var modal = document.getElementById('modal-card');
    if (event.target === modal) modal?.classList.remove('show-modal');
  }

  openModal() {
    var modal = document.getElementById('modal-card');
    if (modal) modal.classList.add('show-modal');
  }

  saveCard(card: CreditCardRequest) {
    if (this.cardToValidate.find((c) => c.cardNumber === card.cardNumber))
      return;

    this.cardToValidate.push(card);
  }

  getInfosStripe() {
    this.cardToValidate.forEach((c) => {
      c.statusProcessed = 'Validando ...';
    });
    var cards = {
      creditCardGenerated: this.cardToValidate,
    };
    this.stripeService.getInfosStripe(cards).subscribe(
      (data) => {
        data.forEach((info) => {
          let card = this.cardToValidate.find(
            (c) => c.cardNumber === info.creditCard?.split('|')[0]
          );
          if (card) {
            card.isProcessed = true;
            this.testedCards = this.testedCards + 1;
            card.errorMessage = info.message;
            card.status = info.isOk;
            if (!card.status) this.reprovedCards = this.reprovedCards + 1;
            else this.aprovedCards = this.aprovedCards + 1;
            card.statusProcessed = 'Verificado';
            if (!card.status) {
              document
                .getElementById(`row-${card.cardNumber}`)
                ?.classList.add('is_invalid');
            } else {
              document
                .getElementById(`row-${card.cardNumber}`)
                ?.classList.add('valid');
            }
          }
        });
      },
      (error) => console.log(error)
    );
  }
}
