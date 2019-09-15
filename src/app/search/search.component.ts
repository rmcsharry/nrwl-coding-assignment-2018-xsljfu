import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public form: FormGroup;
  public term: AbstractControl;

  constructor(
    private searchService: SearchService,
    private fb: FormBuilder
  ) {
    this.buildForm();
   }

  ngOnInit() {
    const eventStream = this.term.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    );
    eventStream.subscribe(term => {
      if (term !== null && term.length > 0) {
        this.searchService.sendSearchTerm(term);
      };
    });
  }

  buildForm() {
    this.form = this.fb.group({
      term: ['']
    });
    this.term = this.form.controls['term'];
  }

  onSearch(term: string) {
    if (term !== null) this.searchService.sendSearchTerm(term);
  }

}
