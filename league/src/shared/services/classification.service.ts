import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ResponseModel } from '../interfaces/responseModel';
import { ClassificationDTO } from '../interfaces/classification';
import { environment } from '../../environments/environment';

@Injectable()
export class ClassificationService {

  private url = `${environment.base_url}/rws-classification-service`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<ResponseModel<ClassificationDTO>> {
    return this.http.get<ResponseModel<ClassificationDTO>>(this.url);
  }
}
