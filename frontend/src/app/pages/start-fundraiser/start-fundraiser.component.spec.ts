import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartFundraiserComponent } from './start-fundraiser.component';

describe('StartFundraiserComponent', () => {
  let component: StartFundraiserComponent;
  let fixture: ComponentFixture<StartFundraiserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartFundraiserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StartFundraiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
