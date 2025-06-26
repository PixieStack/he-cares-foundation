import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeVolunteerComponent } from './become-volunteer.component';

describe('BecomeVolunteerComponent', () => {
  let component: BecomeVolunteerComponent;
  let fixture: ComponentFixture<BecomeVolunteerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BecomeVolunteerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BecomeVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
