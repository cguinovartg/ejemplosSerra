import { AbstractControl } from '@angular/forms';
import { DataRequestService } from '../services/data-request.service';

export class ValidateReceiptId {
    static createValidator(dataRequestSrc: DataRequestService) {
        return (control: AbstractControl) => {
            return dataRequestSrc.validateReceipt(control.value).map((res: any) => {
                if (res.data[1].description === 'OK') {
                    return null;
                } else {
                    return { receiptInvalid: true };
                }
            });
        };
    }
}
