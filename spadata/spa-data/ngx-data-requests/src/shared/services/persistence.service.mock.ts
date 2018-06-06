import { ResponseModel } from '../interfaces/responseModel';
import { Mediator } from '../interfaces/mediator';
import { Observable } from 'rxjs/Observable';

export class MockPersistenceService {
  get(key): any {
    return sessionStorage.getItem(key);
  }
}
