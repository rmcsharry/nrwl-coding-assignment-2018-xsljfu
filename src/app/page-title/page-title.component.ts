import { Component, OnInit } from '@angular/core';
import { PageService } from '../services/page.service';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit {
  pageTitle: string = 'You forgot the page title dummy!';

  constructor(
    private pageService: PageService
  ) { }

  ngOnInit() {
    this.pageService.getPageTitle.subscribe(data => this.pageTitle = data);
  }

}
