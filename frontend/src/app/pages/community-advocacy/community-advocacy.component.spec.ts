import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityAdvocacyComponent } from './community-advocacy.component';

describe('CommunityAdvocacyComponent', () => {
  let component: CommunityAdvocacyComponent;
  let fixture: ComponentFixture<CommunityAdvocacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityAdvocacyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunityAdvocacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
