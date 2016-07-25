import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-pagination',
    templateUrl: 'pagination.component.html'
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() total: number; // 資料總筆數
  @Input() perPage: number = 30; // 一頁幾筆
  @Input() currPage: number = 1; // 目前所在頁數

  @Output() pageChanged = new EventEmitter<number>();

  private lastPage: number; // 最後一頁
  // private showPageTags: number = 5; // 顯示幾個頁數標籤
  private pages: number[] = []; // 頁碼陣列

  ngOnInit() {
    // this.lastPage = Math.floor(this.total / this.perPage) + 1;
    // for(let i=1; i<= this.lastPage; i++) {
    //   this.pages.push(i);
    // }
    // this.calcPages();
  }

  ngOnChanges() {
    this.calcPages();
  }

  prevPage() {
    if(this.currPage > 1) {
      this.changePage(this.currPage - 1);
    }
  }

  nextPage() {
    if(this.currPage < this.lastPage) {
      this.changePage(this.currPage + 1);
    }
  }

  changePage(targetPage: number) {
    //console.log(targetPage);
    if(targetPage !== this.currPage) {
      if((targetPage < 1) || (targetPage > this.lastPage)) {
        return;
      }
      this.pageChanged.emit(targetPage);
    }
  }

  private calcPages() {
    this.pages = [];
    this.lastPage = Math.floor(this.total / this.perPage) + 1;
    for(let i=1; i<= this.lastPage; i++) {
      this.pages.push(i);
    }
  }
}
