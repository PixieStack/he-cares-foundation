import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateSchoolPartnershipsComponent } from './corporate-school-partnerships.component';

describe('CorporateSchoolPartnershipsComponent', () => {
  let component: CorporateSchoolPartnershipsComponent;
  let fixture: ComponentFixture<CorporateSchoolPartnershipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporateSchoolPartnershipsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CorporateSchoolPartnershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
