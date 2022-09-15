import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreditCardRequest } from 'src/app/models/creditCardRequest';
import { BinService } from 'src/app/services/bin/bin.service';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  public formCreditCard: FormGroup;
  public isSubmited: boolean = false;
  public cardToValidate: CreditCardRequest[] = [];
  @Output() emitter = new EventEmitter<CreditCardRequest>();

  constructor(
    private formBuilder: FormBuilder,
    private binService: BinService
  ) {
    this.formCreditCard = this.formBuilder.group({
      allCards: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {}

  validateCard() {
    this.isSubmited = true;
    if (this.formCreditCard.invalid) return;
    let cards: string = this.formCreditCard.get('allCards')?.value;
    var separateLines: string[] = cards.split(/\r?\n|\r|\n/g);
    separateLines.forEach((card) => {
      let infos: string[] = card.split('|');
      let cardsInfos: CreditCardRequest = {
        cardNumber: infos[0],
        expireDate: `&{infos[1]}&{infos[2]}`,
        securityCode: infos[3],
        expMonth: infos[1],
        expYear: infos[2],
        status: false,
        isProcessed: false,
        statusProcessed: 'A validar ...',
      };
      if (cardsInfos.cardNumber) {
        this.binService
          .getInfos(cardsInfos.cardNumber.substring(0, 6))
          .subscribe((data) => {
            cardsInfos.bandeiraCard = data.card.scheme;
          });
        this.emitter.emit(cardsInfos);
      }
    });
    setTimeout(() => {
      this.closeModal();
      this.formCreditCard.reset();
    }, 750);
  }

  closeModal() {
    var modal = document.getElementById('modal-card');
    if (modal) modal.classList.remove('show-modal');
  }
}
