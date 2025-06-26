import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrisisSupportComponent } from './crisis-support.component';

describe('CrisisSupportComponent', () => {
  let component: CrisisSupportComponent;
  let fixture: ComponentFixture<CrisisSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrisisSupportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CrisisSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
