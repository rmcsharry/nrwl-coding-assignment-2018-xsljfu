import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  searchTermStream = new Subject<string>();
  onClearSearch = new Subject<any>();
  onResetSearch = new Subject<any>();

  sendSearchTerm(term: string) {
    console.log('sending search term:', term);
    this.searchTermStream.next(term)
  }

  clearSearch(): void {
    this.onClearSearch.next(null);
  }

  resetSearch(): void {
    this.onResetSearch.next(null);
  }
}
