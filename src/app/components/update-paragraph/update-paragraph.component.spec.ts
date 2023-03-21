import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateParagraphComponent } from './update-paragraph.component';

describe('UpdateParagraphComponent', () => {
  let component: UpdateParagraphComponent;
  let fixture: ComponentFixture<UpdateParagraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateParagraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateParagraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
