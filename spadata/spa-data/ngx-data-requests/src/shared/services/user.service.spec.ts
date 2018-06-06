import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';

import { UserService } from './user.service';
import { ResponseModel } from '../interfaces/responseModel';
import { Mediator } from '../interfaces/mediator';

xdescribe('UserService testing', () => {

  let userService: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    userService = TestBed.get(UserService);
    httpTestingController  = TestBed.get(HttpTestingController);
  });

  it('Recover all mediators from rws-user-account', () => {

    const testUrl = 'https://wwwd.es.intrallianz.com/rws-user-account/api/agent-accounts/agents?mediator=pa174990';

    const testData: Mediator[] = [
      {
        agentNumber: '0000000',
        sucursal: '000',
        accountManagerSubNumber: '0000',
        uc: '',
        roleNameOfAccountManager: 'ADMINISTRA',
        email: '',
        firstName: 'agente.not.found',
        lastName: 'agente.not.found'
      },
      {
        agentNumber: '0010001',
        sucursal: '001',
        accountManagerSubNumber: '0000',
        uc: '',
        roleNameOfAccountManager: 'ADMINISTRA',
        email: '',
        firstName: 'agente.not.found',
        lastName: 'agente.not.found'
      }
    ];

    userService.getMediators('pa174990').subscribe((response: ResponseModel<Mediator>) => {
      expect(response.data).toBeTruthy();
      expect(response.data.length).toBe(2);
      expect(response.status).toBe('OK');
      expect(response.success).toBeTruthy();
      expect(response.data).toEqual(testData);
    });

    const request = httpTestingController.expectOne(testUrl);

    expect(request.cancelled).toBeFalsy();
    expect(request.request.method).toEqual('GET');
    expect(request.request.responseType).toEqual('json');

    request.flush({
      success: true,
      status: 'OK',
      data: testData
    });

    httpTestingController.verify();

  });

});
