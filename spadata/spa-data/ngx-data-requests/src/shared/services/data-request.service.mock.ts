import { ResponseModel } from './../interfaces/responseModel';
import { SearchRequest } from './../interfaces/search-request';
import { PetitionProduct } from './../interfaces/petition';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { DataRequestDTO } from '../interfaces/dataRequestdto';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { DetailRequest } from '../interfaces/detail-request';
import { map } from 'rxjs/operators/map';

@Injectable()
export class MockDataRequestService {

  testData: Array<SearchRequest> = [
    {
      userId: '1',
      petitionNumber: '1',
      reportType: '1',
      creationDate: '1',
      fullCreationDate: '1',
      status: '1',
      text: '1',
      selectedDate: '1',
      id: '1',
    },
    {
      userId: '2',
      petitionNumber: '2',
      reportType: '2',
      creationDate: '2',
      fullCreationDate: '2',
      status: '2',
      text: '2',
      selectedDate: '2',
      id: '2'
    }];


  constructor() {}

  getDataDetail(requestNumber): Observable<ResponseModel<DetailRequest>> {
    return null;
  }

  getDataSearch(
    agent: string,
    dateFrom?: string,
    dateTo?: string,
    limit?: string,
    offset?: string,
    orderBy?: string,
    requestStatus?: string,
    requestType?: string
  ): Observable<ResponseModel<SearchRequest>> {

    const fakeResponse: ResponseModel<SearchRequest> = {
      data: this.testData
    };
    return  Observable.of(fakeResponse);
  }

  validatePolicy(policyId: any) {
    console.log('estoy aqui');
    const fakeResponse = {
        'success': true,
        'status': 'OK',
        'took': 0,
        'data': [
            {
                'code': 'Policy',
                'description': 'OK'
            },
            {
                'code': 'Receipt',
                'description': 'OK'
            }
        ]
    };
    return  Observable.of(fakeResponse);
  }

  validateReceipt(receiptId: any) {
    const fakeResponse = {
      'success': true,
      'status': 'OK',
      'took': 0,
      'data': [
          {
              'code': 'Policy',
              'description': 'OK'
          },
          {
              'code': 'Receipt',
              'description': 'OK'
          }
      ]
    };
    return  Observable.of(fakeResponse);
  }
}
