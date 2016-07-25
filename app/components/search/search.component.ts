import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    moduleId: module.id,
    selector: 'my-search',
    templateUrl: 'search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {

  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  private term: string;
  private search$: Subject<string> = new Subject<string>();

  ngOnInit() {
    this.search$.debounceTime(500).distinctUntilChanged().subscribe(() => this.search());
  }

  ngOnDestroy() {
    this.search$.unsubscribe();
  }

  search() {
    if(this.term.trim().length > 0) {
      this.change.emit(this.term);
      //console.log(this.term);
    } else {
      console.log('search term is empty');
    }
  }
}
