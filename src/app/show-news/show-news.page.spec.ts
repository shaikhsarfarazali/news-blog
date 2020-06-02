import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowNewsPage } from './show-news.page';

describe('ShowNewsPage', () => {
  let component: ShowNewsPage;
  let fixture: ComponentFixture<ShowNewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowNewsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowNewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
