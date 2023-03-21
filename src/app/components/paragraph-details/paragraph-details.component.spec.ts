import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraphDetailsComponent } from './paragraph-details.component';

describe('ParagraphDetailsComponent', () => {
  let component: ParagraphDetailsComponent;
  let fixture: ComponentFixture<ParagraphDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParagraphDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagraphDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
