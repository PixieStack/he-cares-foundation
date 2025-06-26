import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadTheWordComponent } from './spread-the-word.component';

describe('SpreadTheWordComponent', () => {
  let component: SpreadTheWordComponent;
  let fixture: ComponentFixture<SpreadTheWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpreadTheWordComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpreadTheWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
