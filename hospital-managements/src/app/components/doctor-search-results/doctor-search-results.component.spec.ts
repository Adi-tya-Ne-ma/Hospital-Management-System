import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSearchResultsComponent } from './doctor-search-results.component';

describe('DoctorSearchResultsComponent', () => {
  let component: DoctorSearchResultsComponent;
  let fixture: ComponentFixture<DoctorSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorSearchResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
