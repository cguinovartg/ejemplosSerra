import { Component, OnInit, Input } from '@angular/core';
import { NxHeadlineModule } from '@allianz/ngx-ndbx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sh-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  public errMsg: Error;

  constructor(
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.errMsg = params['errMsg'];
    });
   }
}
