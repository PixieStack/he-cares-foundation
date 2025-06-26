import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinMovementComponent } from './join-movement.component';

describe('JoinMovementComponent', () => {
  let component: JoinMovementComponent;
  let fixture: ComponentFixture<JoinMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinMovementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JoinMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
