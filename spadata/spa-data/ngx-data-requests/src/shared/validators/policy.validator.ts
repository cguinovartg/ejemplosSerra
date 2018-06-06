import { AbstractControl } from '@angular/forms';
import { DataRequestService } from '../services/data-request.service';

export class ValidatePolicyId {
    static createValidator(dataRequestSrc: DataRequestService) {
        return (control: AbstractControl) => {
            return dataRequestSrc.validatePolicy(control.value).map((res: any) => {
                if (res.success) {
                    return null;
                } else {
                    return { policyInvalid: true };
                }
            });
        };
    }
}
