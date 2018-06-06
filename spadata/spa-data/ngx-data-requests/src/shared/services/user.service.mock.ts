import { ResponseModel } from '../interfaces/responseModel';
import { Mediator } from '../interfaces/mediator';
import { Observable } from 'rxjs/Observable';

export class MockUserService {
  getMediators(): Observable<ResponseModel<Mediator>> {
    return Observable.of({
      data: [ {
        accountManagerSubNumber: ' ',
        agentNumber: 'agente7',
        email: 'string',
        firstName: 'string',
        lastName: 'string',
        roleNameOfAccountManager: 'string',
        sucursal: 'string',
        uc: 'string',
      }]
    });
  }
}
