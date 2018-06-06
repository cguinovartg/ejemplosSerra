import { TranslateService } from '@allianz/core';
import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { NxPersistenceService } from '@allianz/core/nx-persistence/services/persistence.service';
import { ClassificationService } from '../../../shared/services/classification.service';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.scss']
})

export class ClassificationComponent implements OnInit {

  tableColumns: any[];
  tableData: any[];
  perPage: number;

  constructor(
    private classificationService: ClassificationService,
    private translate: TranslateService
  ) {
    this.perPage = 5;
    this.tableColumns = [
      { title: 'Classification', key: 'classification', type: 'number', sortable: true },
      { title: 'Name', key: 'name', type: 'string', sortable: false },
      { title: 'PJ', key: 'pj', type: 'number', sortable: false },
      { title: 'PG', key: 'pg', type: 'number', sortable: false },
      { title: 'PE', key: 'pe', type: 'number', sortable: false },
      { title: 'PP', key: 'pp', type: 'number', sortable: false },
      { title: 'GF', key: 'gf', type: 'number', sortable: false },
      { title: 'GC', key: 'gc', type: 'number', sortable: false },
      { title: 'Ptos', key: 'ptos', type: 'number', sortable: true },
    ];
    this.tableData = [];
  }

  ngOnInit() {
    this.classificationService.getAll().subscribe((response) => {
      console.log(response);
      this.tableData = response.data;
    });
  }
}
