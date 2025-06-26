import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalEmpowermentComponent } from './educational-empowerment.component';

describe('EducationalEmpowermentComponent', () => {
  let component: EducationalEmpowermentComponent;
  let fixture: ComponentFixture<EducationalEmpowermentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationalEmpowermentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EducationalEmpowermentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
