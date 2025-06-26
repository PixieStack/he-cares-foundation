import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactMovementComponent } from './impact-movement.component';

describe('ImpactMovementComponent', () => {
  let component: ImpactMovementComponent;
  let fixture: ComponentFixture<ImpactMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImpactMovementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImpactMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
