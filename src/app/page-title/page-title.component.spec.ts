import { async, ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { PageTitleComponent } from './page-title.component';
import { PageService } from '../services/page.service';
import { of, Observable } from 'rxjs';

class MockPageService {
  get getPageTitle(): Observable<string> { return of('Test Title') }
}

describe('PageTitleComponent', () => {
  let component: PageTitleComponent;
  let fixture: ComponentFixture<PageTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageTitleComponent], providers: [{ provide: PageService, useClass: MockPageService }]
    }).compileComponents();

    fixture = TestBed.createComponent(PageTitleComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should use the title from the service', fakeAsync(() => {
    flush();
    fixture.detectChanges();
    expect(component.pageTitle).toEqual('Test Title')
  }));

  it('should render title from the service', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    flush();
    fixture.detectChanges();
    expect(compiled.querySelector('h2').textContent).toContain('Test Title');
  }));
});
