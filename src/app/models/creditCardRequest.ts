export class CreditCardRequest {
  cardNumber?: string;
  expireDate?: string;
  expMonth?: string;
  expYear?: string;
  securityCode?: string;
  bandeiraCard?: string;
  isProcessed?: boolean = false;
  statusProcessed?: string = 'A validar ...';
  status?: boolean = false;
  errorMessage?: string;
}
